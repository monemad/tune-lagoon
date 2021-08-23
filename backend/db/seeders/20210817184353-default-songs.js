'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        title: 'Change - Summer Peaks',
        length: 264,
        songUrl: 'https://tune-lagoon.s3.us-west-1.amazonaws.com/Change.flac',
        artworkUrl: './assets/image.png',
        userId: 2,
      }
      
  ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Songs', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
