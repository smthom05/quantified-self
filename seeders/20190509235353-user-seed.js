'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'email@email1.com',
      passwordDigest: "password",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      email: 'email@email2.com',
      passwordDigest: "password",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
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
