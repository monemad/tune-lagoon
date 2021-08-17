'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song_Vote = sequelize.define('Song_Vote', {
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Song_Vote.associate = function(models) {
    // associations can be defined here
  };
  return Song_Vote;
};
