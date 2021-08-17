'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song_Genre_Join = sequelize.define('Song_Genre_Join', {
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Song_Genre_Join.associate = function(models) {
    // associations can be defined here
  };
  return Song_Genre_Join;
};
