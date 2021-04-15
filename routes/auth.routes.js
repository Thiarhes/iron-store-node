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
        res.status(500).json(error.message)
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userRepo.findUser(email);

        if (!user) {
            return res.status(500).json(error.message);
        }

        const compareHash = bcrypt.compareSync(password, user.passwordHash);

        if (!compareHash) {
            return res.status(500).json(error.message);
        }

        const payload = {
            id: user.id,
            user: user.username,
            email: user.email,
        };

        const token = jwt.sign(
            payload,
            process.env.SECRET_JWT,
            process.env.EXPIRATION_TOKEN,
        );

        res.status(200).json({ payload, token });


    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.patch('/edit/:id', async (req, res) => {
    const { username, email, password } = req.body;
    const { id } = req.params;
    try {
        const user = await userRepo.updateUser(id, { username, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    try {
        await userRepo.deleteUser(id);
        res.status(200).json({ message: `User successfully deleted!` });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;