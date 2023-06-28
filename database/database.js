const { Sequelize } = require('sequelize');

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    timezone: '-03:00'
});

module.exports = connection;
