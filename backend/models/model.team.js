const { DataTypes } = require('sequelize');

const sequelize = require('../database');

const Team = sequelize.define('team', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  logo:{
    type: DataTypes.TEXT
  }
});

module.exports = Team;
