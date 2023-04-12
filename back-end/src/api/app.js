require('express-async-errors');
const express = require('express');
const cors = require('cors');

const RouterLogin = require('./router/RouterLogin');
const RouterRegister = require('./router/RouterRegister');
const RouterProducts = require('./router/RouterProduct');
const RouterSaleProducts = require('./router/RouterSaleProducts');
const RouterSeller = require('./router/RouterSeller');
const RouterAdmin = require('./router/RouterAdmin');
const RouterSaleDatail = require('./router/RouterSalesDetail');

const app = express();

app.use(express.json());

app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/', RouterLogin);
app.use('/', RouterRegister);
app.use('/', RouterProducts);
app.use('/', RouterSaleProducts);
app.use('/', RouterSeller);
app.use('/', RouterAdmin);
app.use('/', RouterSaleDatail);
app.use('/images', express.static('public'));

app.use((err, _req, res, _next) => {
  console.error('middleware error', err);
  const [code, message] = err.message.split('|');
  return res.status(code).json({ message });
});

module.exports = app;
