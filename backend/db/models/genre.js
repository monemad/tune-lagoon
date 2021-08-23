'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Genre.associate = function(models) {
    // associations can be defined here
    const columnMappingSong = {
      through: 'Song_Genre_Join',
      foreignKey: 'genreId',
      otherKey: 'songId', 
      onDelete: 'CASCADE', 
      hooks: true 
    };
    Genre.belongsToMany(models.Song, columnMappingSong)
  };
  return Genre;
};
