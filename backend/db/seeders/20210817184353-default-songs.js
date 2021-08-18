'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        title: 'Really Cool Song',
        length: 221,
        songUrl: './assets/song.mp3',
        artworkUrl: './assets/image.png',
        userId: 2,
      },
      {
        title: 'Even Better Song',
        length: 198,
        songUrl: './assets/song.mp3',
        artworkUrl: './assets/image.png',
        userId: 2,
      },
      {
        title: 'Beach Vibes',
        length: 52,
        songUrl: './assets/song.mp3',
        artworkUrl: './assets/image.png',
        userId: 1,
      },
      {
        title: 'Gorilla Jungle Beats',
        length: 154,
        songUrl: './assets/song.mp3',
        artworkUrl: './assets/image.png',
        userId: 4,
      },
      {
        title: 'Wonderwall (cover)',
        length: 986,
        songUrl: './assets/song.mp3',
        artworkUrl: './assets/image.png',
        userId: 5,
      },
      {
        title: 'The Sound of Quietness',
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
