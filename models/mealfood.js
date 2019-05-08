'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealFood = sequelize.define('MealFood', {
    FoodId: DataTypes.INTEGER,
    MealId: DataTypes.INTEGER
  }, {});
  MealFood.associate = function(models) {
    MealFood.belongsTo(models.Meal, {foreignKey: 'MealId'});
    MealFood.belongsTo(models.Food, {foreignKey: 'FoodId'});
  };
  return MealFood;
};
