'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Song_Genre_Joins', [
      {
        songId: 1,
        genreId: 1
      },
      {
        songId: 2,
        genreId: 1
      },
      {
        songId: 3,
        genreId: 1
      },
      {
        songId: 4,
        genreId: 1
      },
      {
        songId: 5,
        genreId: 1
      },
      {
        songId: 6,
        genreId: 1
      },
      {
        songId: 1,
        genreId: 3
      },
      {
        songId: 2,
        genreId: 4
      },
      {
        songId: 4,
        genreId: 8
      },
      {
        songId: 6,
        genreId: 2
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkDelete('Song_Genre_Joins', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
