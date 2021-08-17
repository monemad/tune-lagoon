'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song_Playlist_Join = sequelize.define('Song_Playlist_Join', {
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    playlistId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Song_Playlist_Join.associate = function(models) {
    // associations can be defined here
  };
  return Song_Playlist_Join;
};
