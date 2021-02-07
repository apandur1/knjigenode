const Sequelize = require("sequelize");
const sequelize = require('../baza.js');

module.exports = function (sequelize, DataTypes) {
    const Knjiga = sequelize.define('Knjiga', {
        naziv: Sequelize.STRING,
        datum_izdavanja: Sequelize.STRING,
    });
    return Knjiga;
}