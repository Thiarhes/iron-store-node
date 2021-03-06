require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect DB

require('./config/db.config');

const app = express();

app.use(cors());

// middlewares 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const product = require('./routes/product.route');
const auth = require('./routes/auth.routes');
const cart = require('./routes/cart.routes');


app.use('/', auth);

// authentication's middleware

const authMiddleware = require('./middlewares/auth.middleware');
app.use(authMiddleware);

app.use('/', product);
app.use('/cart', cart);


module.exports = app;