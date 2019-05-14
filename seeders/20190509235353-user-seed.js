'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Scott',
      email: 'email@email1.com',
      passwordDigest: "password",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'Manoj',
      email: 'email@email2.com',
      passwordDigest: "password",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      name: 'April',
      email: 'email@email3.com',
      passwordDigest: "password",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
