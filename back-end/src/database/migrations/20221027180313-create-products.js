'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', { 

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        allowNull:false,
        type: Sequelize.VARCHAR(100),
      },

      price: {
        allowNull:false,
        type: Sequelize.STRING,
      },

      url_image: {
        allowNull:false,
        type: Sequelize.VARCHAR(200),
      },
  
    });
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
