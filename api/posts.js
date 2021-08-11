const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const UserModel = require('../models/UserModel');
const PostModel = require('../models/PostModel');
const FollowerModel = require('../models/FollowerModel');
const uuid = require('uuid').v4;

router.post('/', authMiddleware, async (req, res) => {
    const { text, location, picUrl } = req.body;

    if (text.length < 1) return status(401).send("Cannot be empty!");

    try {
        const newPost = {
            user: req.userId,
            text
        };

        if (location) newPost.location = location;
        if (picUrl) newPost.picUrl = picUrl;

        const post = await new PostModel(newPost).save();

        return res.json(post);

    } catch(err) {
        console.log(err);
        return res.status(500).send("Server error");
    }
})

router.get('/' , authMiddleware, async (req, res) => {
    try {

        const posts = await PostModel.find().sort({ createdAt: -1 }).populate('user').populate('comments.user');

        return res.json(posts);

    } catch(err) {
        console.log(err);
        return res.status(500).send("Server error");
    }    
})

router.get('/:postId', authMiddleware, async (req, res) => {
    try {

        const post = await PostModel.findById(req.params.postId);

        if (!post) {
            return res.status(400).send('Post not found.');
        }

        return res.json(post);

    } catch(err) {
        console.log(err);
        return res.status(500).send("Server error");
    }    
})

router.delete('/:postId', authMiddleware, async (req, res) => {
    try {

        const { userId } = req;
        const { postId } = req.params;

        const post = await PostModel.findById(postId);

        if (!post) {
            return res.status(400).send('Post not found.');
        }
        const user = await UserModel.findById(userId);
        if (post.user.toString() !== userId) {
            if (user.role === "root") {
                await post.remove();
                return res.status(200).send("Post deleted successfully");
            }
            else {
                return res.status(401).send("Unauthorized");
            }
        }

        await post.remove();
        return res.status(200).send("Post deleted successfully");

    } catch(err) {
        console.log(err);
        return res.status(500).send("Server error");
    }    
})

router.post('/like/:postId', authMiddleware, async (req, res) => {
    try {

        const { userId } = req;
        const { postId } = req.params;

        const post = await PostModel.findById(req.params.postId);
        if (!post) {
            return res.status(400).send('Post not found.');
        }

        const isLiked = post.likes.filter(like => like.user.toString() === userId).length > 0;

        if (isLiked) {
            return res.status(401).send("Post already liked");
        }

        await post.likes.unshift({ user: userId });
        await post.save();

        return res.status(200).send("Post liked");

    } catch(err) {
        console.log(err);
        return res.status(500).send("Server error");
    }    
})

router.post('/unlike/:postId', authMiddleware, async (req, res) => {
    try {

        const { userId } = req;
        const { postId } = req.params;

        const post = await PostModel.findById(req.params.postId);
        if (!post) {
            return res.status(400).send('Post not found.');
        }

        const isNotLiked = post.likes.filter(like => like.user.toString() === userId).length === 0;

        if (isNotLiked) {
            return res.status(401).send("Post not liked");
        }

        const index = post.likes.map(like => like.user.toString()).indexOf(userId);

        await post.likes.splice(index, 1);
        await post.save();

        return res.status(200).send("Post unliked");

    } catch(err) {
        console.log(err);
        return res.status(500).send("Server error");
    }    
})

router.get('/like/:postId', authMiddleware, async (req, res) => {
    try {

        const { postId } = req.params;

        const post = await PostModel.findById(req.params.postId).populate("likes.user");
        if (!post) {
            return res.status(400).send('Post not found.');
        }
        return res.status(200).json(post.likes);

    } catch(err) {
        console.log(err);
        return res.status(500).send("Server error");
    }    
})

router.post('/comment/:postId', authMiddleware, async (req, res) => {
    try {

        const { userId } = req;
        const { postId } = req.params;
        const { text } = req.body;

        if (text.length < 1) 
            return res.status(401).send("Comment must not be empty");

        const post = await PostModel.findById(req.params.postId);
        if (!post) {
            return res.status(400).send('Post not found.');
        }
console.log(uuid());
        const newComment = {
            _id: uuid(),
            text,
            user: req.userId,
            date: Date.now()
        };

        await post.comments.unshift(newComment);
        await post.save();

        return res.status(200).send("Comment added");


    } catch(err) {
        console.log(err);
        return res.status(500).send("Server error");
    }    
})


module.exports = router;