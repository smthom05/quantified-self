'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    Meal.hasMany(models.Food, {through: models.MealFood, foreignKey: 'FoodId'});
  };
  return Meal;
};
