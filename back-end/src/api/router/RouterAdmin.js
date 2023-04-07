const express = require('express');

const RouterAdmin = express.Router();
const AdminController = require('../controllers/AdminController');
const ProductsController = require('../controllers/ProductsController');
// const LoginController = require('../controllers/LoginController');

const ROUTER_ADMIN = '/admin/manage';

RouterAdmin.get(ROUTER_ADMIN, AdminController.getAllUsers);
RouterAdmin.delete('/admin/manage/:id', AdminController.deleteUser);
RouterAdmin.post(ROUTER_ADMIN, AdminController.createUser);
RouterAdmin.post('/admin/manage/create-product', 
 ProductsController.postProduct);

module.exports = RouterAdmin;
