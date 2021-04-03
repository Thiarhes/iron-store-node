require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect DB

require('./config/db.config');

const app = express();

// middlewares 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const product = require('./routes/product.route');

app.use('/', product);

module.exports = app;