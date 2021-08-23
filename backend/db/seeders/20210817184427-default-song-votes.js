'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkInsert('Song_Votes', [
      {
        liked: true,
        songId: 1,
        userId: 1
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Song_Votes', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
