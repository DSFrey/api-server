'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const cymbalSchema = require('./cymbal.schema');
const userSchema = require('./user.schema');
const collectionSchema = require('./collection.schema');
const ModelInterface = require('./modelInterface');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const CymbalModel = cymbalSchema(sequelizeDatabase, DataTypes);
const UserModel = userSchema(sequelizeDatabase, DataTypes);
const CollectionModel = collectionSchema(sequelizeDatabase, DataTypes);

const interfaceTable = {
  cymbal: new ModelInterface(CymbalModel),
  user: new ModelInterface(UserModel),
  collection: new ModelInterface(CollectionModel),
};

module.exports = {
  sequelizeDatabase,
  interfaceTable,
};
