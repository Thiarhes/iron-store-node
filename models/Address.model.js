const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
    city: { type: String, required: [true, `Enter your city name!`] },
    street: { type: String, required: [true, `Enter your street name!`] },
    number: { type: Number, required: [true, `Enter the number of your house!`] },
    zipcode: { type: Number, required: [true, `Enter your Zip code`] },
    geolocation: { last: { type: Number }, long: { type: Number } },
});

module.exports = model('Address', addressSchema);