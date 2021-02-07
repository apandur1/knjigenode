const Sequelize = require('sequelize');

//Serves all the request which includes /images in the url from Images folder

var db = {}

const sequelize = new Sequelize('wt2018464', 'amelpandur', 'amelpandur', {
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

db.Knjiga = require(__dirname + "/Modeli/knjiga.js")(sequelize, Sequelize.DataTypes)
db.Pisac = require(__dirname + "/Modeli/pisac.js")(sequelize, Sequelize.DataTypes)

db.sequelize = sequelize
db.Sequelize = Sequelize

db.Pisac.hasMany(db.Knjiga)
db.Knjiga.belongsTo(db.Pisac)

module.exports = db