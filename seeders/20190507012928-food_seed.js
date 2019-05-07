'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Food', [{
      id: 1,
      name: 'food1',
      calories: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: 'food2',
      calories: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id:3,
      name: 'food3',
      calories: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
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
