const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'images' });
const RouterAdmin = express.Router();
const AdminController = require('../controllers/AdminController');
const ProductsController = require('../controllers/ProductsController');

const ROUTER_ADMIN = '/admin/manage';

RouterAdmin.get(ROUTER_ADMIN, AdminController.getAllUsers);
RouterAdmin.delete('/admin/manage/:id', AdminController.deleteUser);
RouterAdmin.post(ROUTER_ADMIN, AdminController.createUser);
RouterAdmin.post('/admin/create-product', upload.single('image'), 
 ProductsController.postProduct);

module.exports = RouterAdmin;
