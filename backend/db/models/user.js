'use strict';

const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [60,60]
      }
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {}
      }
    }
  });

  // this cannot be an arrow function
  User.prototype.toSafeObject = function() {
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({credential, password}) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ firstName, lastName, username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      avatarUrl: '/img/default.png',
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = function(models) {
    // associations can be defined here
    const columnMappingSong = {
      as: 'LikedSongs',
      through: 'Song_Vote',
      foreignKey: 'userId', 
      otherKey: 'songId', 
      onDelete: 'CASCADE', 
      hooks: true 
    };
    User.hasMany(models.Song, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true  });
    User.hasMany(models.Comment, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true  });
    User.belongsToMany(models.Song, columnMappingSong);
    User.hasMany(models.Playlist, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true  });
  };

  return User;
};
