'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MealFoods', [{
      MealId: 1,
      FoodId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      MealId: 1,
      FoodId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      MealId: 3,
      FoodId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MealFoods', null, {});
  }
};
