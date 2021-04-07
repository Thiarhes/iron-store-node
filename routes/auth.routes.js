const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepo = require('../repository/user.dao');
const router = Router();

router.post('/signup', async (req, res) => {
    try {
        const user = await userRepo.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: `Error while registering a new user` })
    }
})


router.post('/login', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userRepo.findUser(email);

        if (!user) {
            return res.status(400).json({ message: `Email não encontrado` });
        }

        const compareHash = bcrypt.compareSync(password, user.passwordHash);

        if (!compareHash) {
            return res.status(400).json({ message: `Senha inválida` });
        }

        const payload = {
            id: user.id,
            username: user.username,
        };

        const token = jwt.sign(
            payload,
            'secret',
            { expiresIn: '1 day' },
        );

        res.status(200).json({ payload, token });


    } catch (error) {
        res.status(500).json({ message: `Error while logging in an user` });
    }
})

module.exports = router;