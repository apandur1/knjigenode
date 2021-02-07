let express = require("express")
let app = express()
let db = require("./Baza podataka/baza.js")
var bodyParser = require('body-parser');
const Sequelize = require('sequelize')

app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/', express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({force: false}).then(d => {
    console.log("Valja")
})

async function prodjiKrozNiz(d) {

}

app.get("/knjiga", function (req, res) {
    db.Knjiga.findAll().then(d => {
        for (let i = 0; i < d.length; i++) {
            db.Pisac.findOne({where: {id: d[i].PisacId}}).then(pisac => {
                d[i].PisacId = pisac
                if(i == d.length - 1) {
                    res.json(d)
                }
            }).catch(pisac => {
                console.log("Ne valja")
            })
        }
    }).catch(d => {
        return res.json({poruka: "Problem"})
    })
})

app.get("/knjiga/:id", function (req, res) {
    db.Knjiga.findOne({where: {id: req.params.id}}).then(rezultat => {
        res.json(rezultat)
    }).catch(rezultat => {
        res.json({poruka: "Nešto nije uredu"})
    })
})

app.post("/knjiga", function (req, res) {
    db.Knjiga.create(req.body).then(d => {
        res.json({poruka: "Dodano"})
    }).catch(d => {
        res.json({poruka: "Nije dodano"})
    })
})

app.put("/knjiga/:id", function (req, res) {
    db.Knjiga.update(req.body, {where: {id: req.params.id}}).then(d => {
        res.json({poruka: "Updateano"})
    }).catch(d => {
        res.json({poruka: "Nešto ne valja"})
    })
})

app.delete("/knjiga/:id", function (req, res) {
    db.Knjiga.destroy({where: {id: req.params.id}}).then(d => {
        res.json({poruka: "Obrisano"})
    }).catch(d => {
        res.json({poruka: "Nije obrisano"})
    })
})

app.delete("/knjiga", function (req, res) {
    db.Knjiga.destroy().then(d => {
        res.json({poruka: "Obrisano"})
    }).catch(d => {
        res.json({poruka: "Nije obrisano"})
    })
})

app.get("/pisac", function (req, res) {
    db.Pisac.findAll().then(d => {
        res.json(d)
    }).catch(d => {
        res.json({poruka: "Problem"})
    })
})

app.get("/pisac/:id", function (req, res) {
    db.Pisac.findOne({where: {id: req.params.id}}).then(rezultat => {
        res.json(rezultat)
    }).catch(rezultat => {
        res.json({poruka: "Nešto nije uredu"})
    })
})

app.post("/pisac", function (req, res) {
    db.Pisac.create(req.body).then(d => {
        res.json({poruka: "Dodano"})
    }).catch(d => {
        res.json({poruka: "Nije dodano"})
    })
})

app.put("/pisac/:id", function (req, res) {
    db.Pisac.update(req.body, {where: {id: req.params.id}}).then(d => {
        res.json({poruka: "Updateano"})
    }).catch(d => {
        res.json({poruka: "Nešto ne valja"})
    })
})

app.delete("/pisac/:id", function (req, res) {
    db.Pisac.destroy({where: {id: req.params.id}}).then(d => {
        res.json({poruka: "Obrisano"})
    }).catch(d => {
        res.json({poruka: "Nije obrisano"})
    })
})

app.delete("/pisac", function (req, res) {
    db.Pisac.destroy().then(d => {
        res.json({poruka: "Obrisano"})
    }).catch(d => {
        res.json({poruka: "Nije obrisano"})
    })
})

var server = app.listen(3000);

module.exports = app