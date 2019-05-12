var pry = require('pryjs')

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    passwordDigest: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.UserMeal)
    User.belongsToMany(models.Meal, {through: models.UserMeal, foreignKey: 'UserId'});

  };
  User.prototype.getDailyCalorieInfo =  async function(date) {
    try{
      const meals = await this.getMeals()
      return meals
    }catch(error){
      throw new Error(error.message)
    }
  };
  return User;
};
