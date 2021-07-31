const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const FollowerModel = require('../models/FollowerModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const authMiddleware = require('../middleware/authMiddleware');

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

router.get('/', authMiddleware, async (req,res) => {
    const {userId} = req;
    try {
        const user = await UserModel.findById(userId);
        const userFollowStats = await FollowerModel.findOne({ user: userId });

        return res.status(200).json({ user, userFollowStats });
    }
    catch (err) {
        return res.status(500).send(`Server error`);
    }
})

router.post('/', async (req, res) => {
    const {
        email,
        password
    } = req.body.user;

    if (!isEmail(email))        
        return res.status(401).send("Invalid email");
    if (password.length < 8)
        return res.status(401).send("Password must be at least 8 characters");

    try {
        const user = await UserModel.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user)
            return res.status(401).send("Invalid credentials");

        const isPassword = await bcrypt.compare(password, user.password);

        if (!isPassword)
            return res.status(401).send("Invalid credentials");
   
        const payload = { userId: user._id };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" }, (err, token) => {
            if (err)
                throw err;
            res.status(200).json(token);

        } )

    }
    catch (err) {
        return res.status(500).send("Server Error");
    }    
})

module.exports = router;