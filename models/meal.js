'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    Meal.hasMany(models.MealFood)
    Meal.belongsToMany(models.Food, {through: models.MealFood, foreignKey: 'MealId'});
    Meal.hasMany(models.UserMeal)
    Meal.belongsToMany(models.User, {through: models.UserMeal, foreignKey: 'MealId'});
  };
  Meal.prototype.getTotalCalories = function() {
    var calories = 0
    for (var i=0;i<this.Food.length;i++) {
      calories += this.Food[i].calories
    }
    return calories
  }
  return Meal;
};
