'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Food', [{
      name: 'food1',
      calories: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'food2',
      calories: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'food3',
      calories: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'food4',
      calories: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Food', null, {});
  }
};
