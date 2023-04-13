const Products = require('../services/ProductService');

const ProductsController = {

  getProducts: async (req, res) => {
    const result = await Products.getProducts();
    return res.status(200).json(result);
  },

  postProduct: async (req, res) => {
    const filename = req.file.path;
    const url = filename.replace('public/', '');
    const imageUrl = `http://localhost:3001/images/${url}`;
    const { name, price } = req.body;
    const result = await Products.postProduct(name, price, imageUrl);
    if (!result) {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    return res.status(201).json('Product created successfully');
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;
    const result = await Products.deleteProduct(id);
    if (!result) {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    return res.status(200).json('Product deleted successfully');
  },
};

module.exports = ProductsController;
