'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Song_Genre_Joins', [
      {
        songId: 1,
        genreId: 1
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkDelete('Song_Genre_Joins', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
