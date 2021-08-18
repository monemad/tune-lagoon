'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkInsert('Song_Votes', [
      {
        liked: true,
        songId: 1,
        userId: 1
      },
      {
        liked: false,
        songId: 3,
        userId: 3
      },
      {
        liked: true,
        songId: 1,
        userId: 2
      },
      {
        liked: true,
        songId: 5,
        userId: 2
      },
      {
        liked: true,
        songId: 1,
        userId: 6
      },
      {
        liked: true,
        songId: 1,
        userId: 3
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Song_Votes', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
