const { product } = require('../../database/models');

const ProductService = {

  getProducts: async () => {
    const products = await product.findAll();
    const result = products.map((user) => user.dataValues);
    return result;
  },

  postProduct: async (name, price, imageUrl) => {
    const newProduct = await product.create({
      name,
      price,
      // eslint-disable-next-line camelcase
      url_image: imageUrl,
    });
    return newProduct;
  },

  deleteProduct: async (id) => {
    const result = await product.destroy({
      where: { id },
    });
    return result;
  },
};

module.exports = ProductService;
