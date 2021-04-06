const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
    city: { type: String, required: [true, `Digite o nome de sua cidade!`] },
    street: { type: String, required: [true, `Digite o nome de sua rua!`] },
    number: { type: Number, required: [true, `Digite o número de sua residência!`] },
    zipcode: { type: Number, required: [true, `Digite o seu CEP`] },
    geolocation: { last: { type: Number }, long: { type: Number } },
});

module.exports = model('Address', addressSchema);