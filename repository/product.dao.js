const Product = require('../models/Product.model');

class ProductRepository {
    constructor(ProductModel) {
        this.product = ProductModel;
    }

    getAll = async () => {
        try {
            const products = await this.product.find()
            return products
        } catch (error) {
            throw new Error();
        }
    }

    getOne = async (id) => {
        try {
            const product = await this.product.findById(id)
            return product;
        } catch (error) {
            throw new Error();
        }
    }

    create = async (newProduct) => {
        console.log('here', newProduct)
        try {
            const createdProduct = await this.product.create(newProduct)
            return createdProduct;
        } catch (error) {
            throw new Error();
        }
    }

    update = async (id, product) => {
        try {
            const modifiedProduct = await this.product.findByIdAndUpdate(id, product, { new: true });
            return modifiedProduct;
        } catch (error) {
            throw new Error();
        }
    }

    deleteOne = async (id) => {
        try {
            await this.product.findByIdAndDelete(id)
        } catch (error) {
            throw new Error();
        }
    }

}

module.exports = new ProductRepository(Product)