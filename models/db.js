const Sequelize = require('sequelize');

const sequelize = new Sequelize('informations', 'ilionroot', 'marina2207', {
    host: "mysql669.umbler.com",
    port: 41890,
    dialect: "mysql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};