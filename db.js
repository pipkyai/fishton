const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'fish',
    'root',
    'root',
    {
        host: 'master.ca29a3d5-0c16-4959-8584-102ae8196629.c.dbaas.selcloud.ru',
        port: '5432',
        dialect: 'postgres'
    }
)