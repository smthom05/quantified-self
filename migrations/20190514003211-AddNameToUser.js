'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
    'Users',
    'name',
    {
      type: Sequelize.STRING
    }
  )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Users',
      'name'
    );
  }
};
