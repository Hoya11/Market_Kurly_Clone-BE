'use strict';
const {
  Model
} = require('sequelize');
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
    productId: DataTypes.STRING,
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    discount: DataTypes.NUMBER,
    kurlyOnly: DataTypes.BOOLEAN,
    imgUrl: DataTypes.STRING,
    like: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};