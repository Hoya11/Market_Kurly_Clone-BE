'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart.init({
    cartId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    productId: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    imgurl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};