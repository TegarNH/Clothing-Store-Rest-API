require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routers/index.route');

const app = express();
app.use(cors({ origin: ['*'] }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(`${process.env.BASE_URL}`, routes);

module.exports = app;
