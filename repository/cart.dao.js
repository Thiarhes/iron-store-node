const Cart = require('../models/Cart.model');

class CartRepository {
    constructor(CartModel) {
        this.cart = CartModel;
    }

    getCart = async (userId) => {
        try {
            const cart = await this.cart.findOne({ userId })
                .populate('products')
            return cart;
        } catch (error) {
            throw new Error();
        }
    }

    addProd = async (productId, userId) => {

        try {
            const userCart = await this.cart.findOne({ userId: userId });
            userCart.products.push(productId)
            userCart.save();
            return userCart;
        } catch (error) {
            throw new Error();
        }
    }

    createCart = async (userId) => {
        try {
            const cart = new Cart({ userId, products: [] });
            cart.save();
            return cart;
        } catch (error) {
            throw new Error();
        }
    }

    removeOne = async (userId, productId) => {
        try {
            const userCart = await this.cart.findOne({ userId });

            const productIndex = userCart.products.findIndex((product) => productId == product);
            userCart.products.splice(productIndex, 1);
            userCart.save();
            return userCart;
        } catch (error) {
            throw new Error();
        }
    }

    emptyCart = async (userId) => {
        try {
            let cart = await this.getCart(userId);
            cart.products = [];
            let data = await cart.save();
            return data;
        } catch (error) {
            throw new Error();
        }
    }

}

module.exports = new CartRepository(Cart)