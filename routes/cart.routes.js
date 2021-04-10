const { Router } = require('express');
const cartRepo = require('../repository/cart.dao');
const productRepo = require('../repository/product.dao');
const router = Router();

router.post('/', async (req, res) => {

    const { productId, userId } = req.body;

    try {
        let productDetails = await productRepo.getOne(productId);

        if (!productDetails) {
            return res.status(400).json({ message: `Product not found` });
        }

        await cartRepo.addProd(productId, userId);

        res.status(200).json({ message: `Product added to your cart` });

    } catch (error) {
        res.status(500).json({
            message: `Something went wrong`,
            err: error
        });
    }
});


router.get('/:id', async (req, res) => {
    try {

        let cart = await cartRepo.getCart(req.params.id);
        if (!cart) {
            return res.status(400).json({ message: `Cart not found` });
        }
        res.status(200).json({ status: true, data: cart });

    } catch (error) {
        res.status(500).json({
            message: `Something went wrong`,
            err: error
        })
    }
});


router.post('/removeProd', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        await cartRepo.removeOne(userId, productId);
        res.status(200).json({ message: `Product successfuly removed from your cart` })
    } catch (error) {
        res.status(500).json({ message: `Something went wrong` })
    }
});


router.put('/', async (req, res) => {
    const { userId } = req.body;
    try {
        await cartRepo.emptyCart(userId);
        res.status(200).json({ message: `Cart has been emptied`, })
    } catch (error) {
        res.status(500).json({
            message: `Something went wrong`,
            err: error
        })
    }
});

module.exports = router;