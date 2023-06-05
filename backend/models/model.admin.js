const { DataTypes } = require('sequelize');

const sequelize = require('../database');

const Admin = sequelize.define('admin', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password:{
    type: DataTypes.TEXT
  }
});

module.exports = Admin;
