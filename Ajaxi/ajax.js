var noviRed

function napraviTabelu(knjige) {
    let div = document.getElementById('tabelaDiv')
    div.innerHTML = ""
    let tabela = document.createElement("table")
    tabela.id = "tabela"
    let tijelo = document.createElement("tbody")
    let prviRed = document.createElement("tr")
    let prviRedNaziv = document.createElement("th")
    prviRedNaziv.textContent = "Naziv"
    prviRedNaziv.id = "poljeNaziv"
    let prviRedAutor = document.createElement("th")
    prviRedAutor.textContent = "Autor"
    prviRedAutor.id = "poljeAutor"
    let prviRedGodina = document.createElement("th")
    prviRedGodina.textContent = "Godina izdavanja"
    prviRedGodina.id = "poljeGodina"
    prviRed.appendChild(prviRedNaziv)
    prviRed.appendChild(prviRedAutor)
    prviRed.appendChild(prviRedGodina)
    tijelo.appendChild(prviRed)
    knjige.forEach(knjiga => {
        let red = document.createElement("tr")
        red.onclick = function () {
            red.id = "kliknutiRed"
            noviRed = red
            window.open("./noviProzor.html","Update ili delete ", "height=200,width=300")
        }
        let naziv = document.createElement("td")
        naziv.textContent = knjiga.naziv;
        let autor = document.createElement("td")
        autor.textContent = knjiga.PisacId.ime + " " + knjiga.PisacId.prezime
        if(knjiga.PisacId.nobelovac === 'Da')
            autor.id = "nobel"
        let datum = document.createElement("td")
        datum.textContent = knjiga.datum_izdavanja
        red.appendChild(naziv)
        red.appendChild(autor)
        red.appendChild(datum)
        tijelo.appendChild(red)
    })
    tabela.appendChild(tijelo)
    div.appendChild(tabela)
}

const getKnjigeAJAX = new XMLHttpRequest()
getKnjigeAJAX.onreadystatechange = () => {
    if (getKnjigeAJAX.readyState === 4 && getKnjigeAJAX.status === 200) {
        const knjige = JSON.parse(getKnjigeAJAX.response)
        napraviTabelu(knjige)
    }
    else if (getKnjigeAJAX.readyState === 4 && getKnjigeAJAX.status === 404)
        console.log("Greska")
}
getKnjigeAJAX.open("GET", "http://127.0.0.1:3000/knjiga")
getKnjigeAJAX.send()

const dajPisceAjax = new XMLHttpRequest()
dajPisceAjax.onreadystatechange = function () {
    if (dajPisceAjax.readyState === 4 && dajPisceAjax.status === 200) {
        const pisci = JSON.parse(dajPisceAjax.response)
        let select = document.getElementById("select")
        pisci.forEach(element => {
            let opcija = document.createElement("option")
            opcija.value = element.ime + " " + element.prezime
            opcija.innerHTML = element.ime + " " + element.prezime
            select.appendChild(opcija)
        })
    }
    else if (dajPisceAjax.readyState === 4 && dajPisceAjax.status === 404)
        console.log("Greska")
}
dajPisceAjax.open("GET", "http://127.0.0.1:3000/pisac")
dajPisceAjax.send()

function nadjiIdPisca(naziv) {
    const pisci = JSON.parse(dajPisceAjax.response)
    let potrebniId
    pisci.forEach(element => {
        if(element.ime + " " + element.prezime === naziv)
            potrebniId = element.id
    })
    return potrebniId
}

function dodajKnjigu() {
    const dodajKnjiguAjax = new XMLHttpRequest()
    dodajKnjiguAjax.onreadystatechange = function () {
        if (dodajKnjiguAjax.readyState === 4 && dodajKnjiguAjax.status === 200) {
            window.location.reload()
        }
        else if (dodajKnjiguAjax.readyState === 4 && dodajKnjiguAjax.status === 404)
            console.log("Greska")
    }
    dodajKnjiguAjax.open("POST", "http://127.0.0.1:3000/knjiga")
    dodajKnjiguAjax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    dodajKnjiguAjax.send(JSON.stringify({naziv: document.getElementById("inputNaziv").value, datum_izdavanja: document.getElementById("inputGodina").value, PisacId: nadjiIdPisca(document.getElementById("select").value)}))
}

// function dodajPisca() {
//     const dodajPiscaAjax = new XMLHttpRequest()
//     dodajPiscaAjax.onreadystatechange = function () {
//         if (dodajPiscaAjax.readyState === 4 && dodajPiscaAjax.status === 200) {
//             console.log(document.getElementById("inputDatum").value.toString())
//             window.alert("Pisac je uspješno dodan")
//             window.location.href = "./pocetna.html"
//         }
//         else if (dodajPiscaAjax.readyState === 4 && dodajPiscaAjax.status === 404)
//             console.log("Greska")
//     }
//     dodajPiscaAjax.open("POST", "http://127.0.0.1:3000/pisac")
//     dodajPiscaAjax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     dodajPiscaAjax.send(JSON.stringify({ime: document.getElementById("inputIme").value, prezime: document.getElementById("inputPrezime").value, godina_rodjenja: document.getElementById("inputDatum").value.toString(), nobelovac: document.getElementById("radio").checked?"Da":"Ne"}))
// }