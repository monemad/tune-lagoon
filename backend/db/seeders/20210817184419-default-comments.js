'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Comments', [
      {
        content: 'This is a great song!',
        timeElapsed: 44,
        songId: 1,
        userId: 3
      },
      {
        content: 'Not bad!',
        timeElapsed: 2,
        songId: 6,
        userId: 7
      },
      {
        content: 'I think it could be longer',
        timeElapsed: 980,
        songId: 5,
        userId: 2
      },
      {
        content: 'This really made me FEEL like Batman. Got a little something for everyone 8/10',
        timeElapsed: 62,
        songId: 4,
        userId: 4
      },
      {
        content: 'Not as good as the first one',
        timeElapsed: 44,
        songId: 2,
        userId: 6
      },
      {
        content: '...garbage',
        timeElapsed: 44,
        songId: 3,
        userId: 3
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Comments', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
