'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      productId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      discount: {
        type: Sequelize.INTEGER
      },
      kurlyOnly: {
        type: Sequelize.BOOLEAN
      },
      imgurl: {
        type: Sequelize.STRING
      },
      createdTime: {
        type: Sequelize.STRING
      },
      like: {
        type: Sequelize.INTEGER
      },
      salesUnit: {
        type: Sequelize.STRING
      },
      weightVolume: {
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
    await queryInterface.dropTable('Products');
  }
};