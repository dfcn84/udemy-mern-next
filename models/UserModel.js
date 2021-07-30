const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        username: { type: String, required: true, unique: true, trim: true },
        profilePhotoUrl: { type: String },
        newMessagePopup: { type: Boolean, default: true },
        unreadMessage: { type: Boolean, default: false },
        unreadNotification: { type: Boolean, default: false },
        role: { type: String, default: "user", enum: ['user', 'admin']},
        resetToken: { type: String },
        expireToken: { type: Date }
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);