'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserMeal = sequelize.define('UserMeal', {
    UserId: DataTypes.INTEGER,
    MealId: DataTypes.INTEGER
  }, {});
  UserMeal.associate = function(models) {
    UserMeal.belongsTo(models.User, {foreignKey: 'UserId'});
    UserMeal.belongsTo(models.Meal, {foreignKey: 'MealId'});
  };
  return UserMeal;
};
