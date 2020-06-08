const Sequelize = require('sequelize');

const sequelize = new Sequelize('informations', 'ilionroot', 'marina2207', {
    host: "mysql669.umbler.com",
    dialect: "mysql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};