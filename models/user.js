'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Review, {
        foreignKey: "userId",
        sourceKey: "userId",
        constraints: false,
      });
    }
  }
  User.init({
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};