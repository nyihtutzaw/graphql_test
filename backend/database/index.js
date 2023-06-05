const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config()

// Set up Sequelize
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
});

module.exports = sequelize;
