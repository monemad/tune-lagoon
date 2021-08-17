'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here
    const columnMappingSong = {
      through: 'Song_Playlist_Join',
      foreignKey: 'playlistId',
      otherKey: 'songId'
    };
    Playlist.belongsTo(models.User, { foreignKey: 'userId' });
    Playlist.belongsToMany(models.Song, columnMappingSong);
  };
  return Playlist;
};
