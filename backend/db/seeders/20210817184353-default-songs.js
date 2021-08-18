'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        title: 'Fuck Kristian He Sucks',
        length: 221,
        songUrl: './assets/song.mp3',
        artworkUrl: './assets/image.png',
        userId: 2,
      },
      {
        title: 'Fuck Kristian He Sucks 2',
        length: 198,
        songUrl: './assets/song.mp3',
        artworkUrl: './assets/image.png',
        userId: 2,
      },
      {
        title: 'Fuck Kristian He Sucks 3',
        length: 52,
        songUrl: './assets/song.mp3',
        artworkUrl: './assets/image.png',
        userId: 1,
      },
      {
        title: 'Fuck Kristian He Sucks 4',
        length: 154,
        songUrl: './assets/song.mp3',
        artworkUrl: './assets/image.png',
        userId: 4,
      },
      {
        title: 'Fuck Kristian He Sucks 5',
        length: 986,
        songUrl: './assets/song.mp3',
        artworkUrl: './assets/image.png',
        userId: 5,
      },
      {
        title: 'Fuck Kristian He Sucks 6',
        length: 12,
        songUrl: './assets/song.mp3',
        artworkUrl: './assets/image.png',
        userId: 6
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Songs', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
