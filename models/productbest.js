'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productBest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  productBest.init({
    productbestId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    kurlyOnly: DataTypes.BOOLEAN,
    imgurl: DataTypes.STRING,
<<<<<<< HEAD:models/product.js
    createdTime: DataTypes.STRING,
    liesUnit: DataTypes.STRING,
    weigke: DataTypes.INTEGER,
    salhtVolume: DataTypes.STRING,
    shippingType: DataTypes.STRING,
    packagingType: DataTypes.STRING,
    allergyInfo: DataTypes.STRING,
    notification: DataTypes.STRING,
    amount: DataTypes.INTEGER
=======
    originals: DataTypes.STRING,
    desc: DataTypes.STRING
>>>>>>> origin/jinwoo:models/productbest.js
  }, {
    sequelize,
    modelName: 'productBest',
  });
  return productBest;
};