const Sequelize = require("sequelize");
const sequelize = require('../baza.js');

module.exports = function (sequelize, DataTypes) {
    const Pisac = sequelize.define('Pisac', {
        ime: Sequelize.STRING,
        prezime: Sequelize.STRING,
        datum_rodjenja: Sequelize.STRING,
        nobelovac: {
            type: Sequelize.STRING,
            validate: {
                isIn: {
                    args: [['Da', 'Ne']]
                }
            }
        }
    });
    return Pisac;
}