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
        res.status(500).json({message:`Error while registering a new user`})
    }
})

module.exports = router;