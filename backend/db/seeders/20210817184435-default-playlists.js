'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Playlists', [
      {
        name: 'I hate Kristian',
        private: false,
        userId: 2
      },
      {
        name: 'Me too!',
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
