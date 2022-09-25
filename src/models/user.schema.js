'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
