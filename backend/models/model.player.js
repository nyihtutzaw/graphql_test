const { DataTypes } = require('sequelize');

const sequelize = require('../database');

const Player = sequelize.define('players', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  position:{
    type: DataTypes.TEXT
  },
  kit:{
    type: DataTypes.INTEGER
  },
  image:{
    type: DataTypes.TEXT
  },
  teamId: DataTypes.INTEGER,
});

module.exports = Player;
