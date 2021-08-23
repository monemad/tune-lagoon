'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Song_Playlist_Joins', [
      {
        playlistId: 1,
        songId: 1
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Song_Playlist_Joins', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
