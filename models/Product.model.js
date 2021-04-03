const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String },
        image: { type: String },
        category: { type: String },
    },
    {
        timestamps: true,
    }
);

module.exports = model('Product', productSchema);