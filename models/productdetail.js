'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  productDetail.init({
    productId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    kulyOnly: DataTypes.BOOLEAN,
    imgurl: DataTypes.STRING,
    like: DataTypes.INTEGER,
    salesUnit: DataTypes.STRING,
    weigtVolume: DataTypes.STRING,
    shippingType: DataTypes.STRING,
    packagingType: DataTypes.STRING,
    allergyInfo: DataTypes.STRING,
    notification: DataTypes.STRING,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'productDetail',
  });
  return productDetail;
};


