'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    songURl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artworkUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
    const columnMappingUser = {
      as: 'UsersThatLiked',
      through: 'Song_Vote',
      foreignKey: 'songId', 
      otherKey: 'userId'
    };
    const columnMappingPlaylist = {
      through: 'Song_Playlist_Join',
      foreignKey: 'songId',
      otherKey: 'playlistId'
    };
    const columnMappingGenre = {
      through: 'Song_Genre_Join',
      foreignKey: 'songId',
      otherKey: 'genreId'
    };
    Song.belongsTo(models.User, { foreignKey: 'userId' });
    Song.hasMany(models.Comment, { foreignKey: 'songId' });
    Song.belongsToMany(models.User, columnMappingUser);
    Song.belongsToMany(models.Playlist, columnMappingPlaylist);
    Song.belongsToMany(models.Genre, columnMappingGenre);
  };
  return Song;
};
