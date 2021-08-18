'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Genres', [
      {
        genre: 'Kristian Hate',
      },
      {
        genre: 'Rock',
      },
      {
        genre: 'Pop',
      },
      {
        genre: 'Hip-Hop',
      },
      {
        genre: 'Rap',
      },
      {
        genre: 'Classical',
      },
      {
        genre: 'Jazz',
      },
      {
        genre: 'Other',
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkDelete('Genres', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
