const Cart = require('../models/Cart.model');

class CartRepository {
    constructor(CartModel) {
        this.cart = CartModel;
    }


    createCart = async (newCart) => {
        try {
            const cart = await this.cart.create(newCart);
            return cart;
        } catch (error) {
            throw new Error();
        }
    }


    getCart = async (cartId, populate = false) => {
        try {
            const cart = populate
                ? await this.cart.findById(cartId)
                    .populate('products')
                    .populate('userId')
                : await this.cart.findById(cartId);
            return cart;
        } catch (error) {
            throw new Error();
        }
    }


    updateCart = async (cartId, cart) => {
        try {
            const updatedCart = await this.cart.findByIdAndUpdate(cartId, cart, { new: true });
            return updatedCart;
        } catch (error) {
            throw new Error();
        }
    }

    deleteCart = async (cartId) => {
        try {
            const deletedCart = await this.cart.findByIdAndDelete(cartId);
            return deletedCart;
        } catch (error) {
            throw new Error();
        }
    }

}

module.exports = new CartRepository(Cart)