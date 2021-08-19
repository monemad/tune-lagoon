'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Song_Playlist_Joins', [
      {
        playlistId: 1,
        songId: 1
      },
      {
        playlistId: 1,
        songId: 2
      },
      {
        playlistId: 1,
        songId: 3
      },
      {
        playlistId: 1,
        songId: 4
      },
      {
        playlistId: 1,
        songId: 5
      },
      {
        playlistId: 1,
        songId: 6
      },
      {
        playlistId: 2,
        songId: 1
      },
      {
        playlistId: 2,
        songId: 2
      },
      {
        playlistId: 3,
        songId: 2
      },
      {
        playlistId: 3,
        songId: 6
      },
      {
        playlistId: 3,
        songId: 4
      },
      {
        playlistId: 3,
        songId: 2
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Song_Playlist_Joins', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
