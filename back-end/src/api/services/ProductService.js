const { product } = require('../../database/models');

const ProductService = {

  getProducts: async () => {
    const products = await product.findAll();
    const result = products.map((user) => user.dataValues);
    return result;
  },

  postProduct: async (name, price, urlImage) => {
    const newProduct = await product.create({
      name,
      price,
      // eslint-disable-next-line camelcase
      url_image: urlImage,
    });
    return newProduct;
  },
};

module.exports = ProductService;
