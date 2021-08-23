'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Comments', [
      {
        content: 'This is a great song!',
        timeElapsed: 44,
        songId: 1,
        userId: 3
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Comments', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
