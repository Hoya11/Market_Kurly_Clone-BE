'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productDetails', {
      productId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productnewId: {
        type: Sequelize.INTEGER
      },
      productbestId: {
        type: Sequelize.INTEGER
      },
      productsaleId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      subtitle: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.INTEGER
      },
      kulyOnly: {
        type: Sequelize.BOOLEAN
      },
      imgurl: {
        type: Sequelize.STRING
      },
      salesUnit: {
        type: Sequelize.STRING
      },
      weigtVolume: {
        type: Sequelize.STRING
      },
      shippingType: {
        type: Sequelize.STRING
      },
      packagingType: {
        type: Sequelize.STRING
      },
      allergyInfo: {
        type: Sequelize.STRING
      },
      notification: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productDetails');
  }
};