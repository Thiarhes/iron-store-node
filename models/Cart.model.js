const { Schema, model } = require('mongoose');

const cartSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        date: { type: Date },
        products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
    },
    {
        timestamps: true,
    }
);

module.exports = model('Cart', cartSchema);