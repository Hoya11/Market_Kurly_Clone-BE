'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    productId: {
      type: Sequelize.STRING
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
    imgUrl: {
      type: Sequelize.STRING
    },
    like: {
      type: Sequelize.INTEGER
    },
  }, {
    sequelize,
    modelName: 'product',
    tableName: "products",
  });
  return product;
};