'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('collection', {
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cymbalID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
