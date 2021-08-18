'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Demo',
        lastName: 'User',
        username: 'Demo-lition',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        avatarUrl: '/img/default.png',
      },
      {
        firstName: 'Ivy',
        lastName: 'Huynh',
        username: 'WellHelloIvy',
        email: 'sexiibaybee420@gmail.com',
        hashedPassword: bcrypt.hashSync('password'),
        avatarUrl: '/img/default.png',
      },
      {
        firstName: 'Kristian',
        lastName: 'Martinez',
        username: 'slimy_balls',
        email: 'kris@martin.com',
        hashedPassword: bcrypt.hashSync('password'),
        avatarUrl: '/img/default.png',
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatarUrl: '/img/default.png'
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatarUrl: '/img/default.png'
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatarUrl: '/img/default.png'
      },
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        avatarUrl: '/img/default.png'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true});
  }
};
