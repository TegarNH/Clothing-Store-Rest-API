require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors({ origin: ['*'] }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
