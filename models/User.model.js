const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username:
        {
            type: String,
            required: [true, `Enter your username`],
            trim: true,
            match: [/^[a-zA-Z0-9_-]{6,12}$/, `Your username cannot contain symbols or spaces, and must have between 6 and 12 characters!`],
            unique: true,
        },
        email:
        {
            type: String,
            unique: true,
            trim: true,
            required: [true, `Enter you email`],
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please, enter a valid email"],
        },
        passwordHash:
            { type: String, required: [true, `Enter a password!`] },
        address:
            { type: Schema.Types.ObjectId, ref: 'Address' },
        phone:
            { type: String },
    },
    {
        timestamps: true
    }
);

module.exports = model('User', userSchema);