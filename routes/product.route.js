const { Router } = require('express');
const productRepo = require('../repository/product.dao');
const router = Router();

router.get('/products', async (req, res) => {
    try {
        const products = await productRepo.getAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: `Error while getting products` })
    }
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const oneProduct = await productRepo.getOne(id);
        res.status(200).json(oneProduct)
    } catch (error) {
        res.status(500).json({ message: `Error while getting a single product` })
    }
});

router.post('/products', async (req, res) => {
    const product = req.body;
    try {
        const newProduct = await productRepo.create(product);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: `Error while creating new product` });
    }
});

router.patch('/products/:id', async (req, res) => {
    const product = req.body;
    const { id } = req.params;
    try {
        const modifiedProduct = await productRepo.update(id, product);
        res.status(201).json(modifiedProduct);
    } catch (error) {
        res.status(500).json({ message: `Error while updating a product` })
    }
})

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await productRepo.delete(id);
        res.status(200).json({ message: `product successful deleted` });
    } catch (error) {
        res.status(500).json({ message: `server side error while deleting a product` })
    }
});

module.exports = router;
