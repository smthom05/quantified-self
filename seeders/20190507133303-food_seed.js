'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Food', [{
      id: 5,
      name: 'Banana',
      calories: 150,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      name: 'Hamburger',
      calories: 700,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 7,
      name: 'Yogurt',
      calories: 200,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Food', null, {});

  }
};
