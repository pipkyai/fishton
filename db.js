const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'fish',
    'root',
    'root',
    {
        host: 'master.d16e575e-5779-43e7-973f-401e7edb355d.c.dbaas.selcloud.ru',
        port: '5432',
        dialect: 'postgres'
    }
)