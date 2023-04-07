const Products = require('../services/ProductService');

const ProductsController = {

  getProducts: async (req, res) => {
    const result = await Products.getProducts();
    return res.status(200).json(result);
  },

  postProduct: async (req, res) => {
    const { name, price, urlImage } = req.body;
    const result = await Products.postProduct(name, price, urlImage);
    if (!result) {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }
    return res.status(201).json('Product created successfully');
  },
};

module.exports = ProductsController;
