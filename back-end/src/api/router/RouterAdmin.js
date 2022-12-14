const express = require('express');

const RouterAdmin = express.Router();
const AdminController = require('../controllers/AdminController');

const ROUTER_ADMIN = '/admin/manage';

RouterAdmin.get(ROUTER_ADMIN, AdminController.getAllUsers);
RouterAdmin.delete('/admin/manage/:id', AdminController.deleteUser);
RouterAdmin.post(ROUTER_ADMIN, AdminController.createUser);

module.exports = RouterAdmin;
