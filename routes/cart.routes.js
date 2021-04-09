const { Router } = require('express');
const cartRepo = require('../repository/cart.dao');
const router = Router();

router.post('/cart', async (req, res) => {
    try {
        const newCart = await cartRepo.createCart(req.body);
        return res.status(201).json(newCart);
    } catch (error) {
        return res.status(500).json({})
    }
})

module.exports = router;