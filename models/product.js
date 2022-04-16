'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    productId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    kurlyOnly: DataTypes.BOOLEAN,
    imgurl: DataTypes.STRING,
    createdTime: DataTypes.STRING,
    like: DataTypes.INTEGER,
    salesUnit: DataTypes.STRING,
    weightVolume: DataTypes.STRING,
    shippingType: DataTypes.STRING,
    packagingType: DataTypes.STRING,
    allergyInfo: DataTypes.STRING,
    notification: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};