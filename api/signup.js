const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');
const FollowerModel = require('../models/FollowerModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const defaultProfilePhoto = "https://placehold.co/250x250";

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;


router.get('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        if (username.length < 1)        
            return res.status(401).send("Invalid user");
        if (!regexUserName.test(username))
            return res.status(401).send("Invalid user");
        const user = await UserModel.findOne({ username: username.toLowerCase() });
        if (user)
            return res.status(401).send("Username already taken!");
        return res.status(200).send("Available");
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }
})

router.post('/', async (req, res) => {
    const {
        name,
        email,
        username,
        password,
        bio,
        facebook,
        youtube,
        twitter,
        instagram
    } = req.body.user;

    if (!isEmail(email))        
        return res.status(401).send("Invalid email");
    if (password.length < 8)
        return res.status(401).send("Password must be at least 8 characters");

    try {
console.log(req.body.user);
        let user;
        user = await UserModel.findOne({ username: username.toLowerCase() });
        if (user)
            return res.status(401).send("User already registered!");

        user = new UserModel({ 
                    name, 
                    email: email.toLowerCase(),
                    username: username.toLowerCase(),
                    password,
                    profilePhotoUrl: req.body.profilePhotoUrl||defaultProfilePhoto
                 })

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        let profileFields = {};
        profileFields.user = user._id;
        profileFields.bio = bio;
        profileFields.social = {};
        if (facebook)
            profileFields.social.facebook = facebook;
        if (youtube)
            profileFields.social.youtube = youtube;                 
        if (instagram)
            profileFields.social.instagram = instagram;                 
        if (twitter)
            profileFields.social.twitter = twitter;  
            
        await new ProfileModel(profileFields).save();
        await new FollowerModel({ user: user._id, followers:[] , following: []}).save();

        const payload = { userId: user._id };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" }, (err, token) => {
            if (err)
                throw err;
            res.status(200).json(token);

        } )

    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Server Error");
    }    
})

module.exports = router;