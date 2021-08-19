'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Playlists', [
      {
        name: 'My Special Jam',
        private: false,
        userId: 2
      },
      {
        name: 'Gud songs!', 
        private: false,
        userId: 6
      },
      {
        name: 'Chill Vibes',
        private: true,
        userId: 3
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Playlists', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
