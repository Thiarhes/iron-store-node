const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username:
        {
            type: String,
            required: [true, `Insira seu nome de usuário`],
            trim: true,
            match: [/^[a-zA-Z0-9_-]{8,15}$/, `Seu nome de usuário não pode conter símbolos, nem espaços e deve 
            ter entre 8 e 15 caracteres!`],
            unique: true,
        },
        email:
        {
            type: String,
            unique: true,
            trim: true,
            required: [true, `Insira um email`],
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Por favor insira um email válido"],
        },
        passwordHash:
            { type: String, required: [true, `Insira uma senha!`] },
        address:
            { type: Schema.Types.ObjectId, ref: 'Address' },
        phone:
            { type: Number },
    },
    {
        timestamps: true
    }
);

module.exports = model('User', userSchema);