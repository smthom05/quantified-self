'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    passwordDigest: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.UserMeal)
    User.belongsToMany(models.Meal, {through: models.UserMeal, foreignKey: 'UserId'});
  };
  return User;
};
