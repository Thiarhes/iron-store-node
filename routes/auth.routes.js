const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepo = require('../repository/user.dao');
const cartRepo = require('../repository/cart.dao');
const router = Router();

router.post('/signup', async (req, res) => {
    try {
        const user = await userRepo.register(req.body);
        await cartRepo.createCart(user.id);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: `Error while registering a new user` })
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
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
            user: user.username,
            email: user.email,
        };

        const token = jwt.sign(
            payload,
            process.env.SECRET_JWT,
            { expiresIn: '1 day' },
        );

        res.status(200).json({ payload, token });


    } catch (error) {
        res.status(500).json({ message: `Error while logging in an user` });
    }
});

router.patch('/edit/:id', async (req, res) => {
    const { username, email, password } = req.body;
    const { id } = req.params;
    try {
        const user = await userRepo.updateUser(id, { username, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: `Error while editing an user` });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    try {
        await userRepo.deleteUser(id);
        res.status(200).json({ message: `User successfully deleted!` });
    } catch (error) {
        res.status(500).json({ message: `Error while deleting an user` });
    }
});

module.exports = router;