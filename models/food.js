'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {});
  Food.associate = function(models) {
    Food.belongsToMany(models.Meal, {through: models.MealFood, foreignKey: 'MealId'})
  };
  return Food;
};