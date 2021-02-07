

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

function formatiraj_datum(datum) {
    let niz = datum.split("-").filter(s => s !== "")
    return niz[2] + "." + niz[1] + "." + niz[0]
}

function nadjiIdPisca(naziv) {
    const pisci = JSON.parse(dajPisceAjax.response)
    let potrebniId
    pisci.forEach(element => {
        if(element.ime + " " + element.prezime === naziv)
            potrebniId = element.id
    })
    return potrebniId
}

function dajIdKnjige(naziv) {
    let potrebniId
    const getKnjigeAJAX = new XMLHttpRequest()
    getKnjigeAJAX.onreadystatechange = () => {
        if (getKnjigeAJAX.readyState === 4 && getKnjigeAJAX.status === 200) {
            const knjige = JSON.parse(getKnjigeAJAX.response)
            knjige.forEach(element => {
                if(element.naziv === naziv)
                    potrebniId = element.id
            })
        }
        else if (getKnjigeAJAX.readyState === 4 && getKnjigeAJAX.status === 404)
            console.log("Greska")
    }
    getKnjigeAJAX.open("GET", "http://127.0.0.1:3000/knjiga")
    getKnjigeAJAX.send()
    return potrebniId
}

function updateFunkcija() {
    document.getElementById("nevidljivo").id = "vidljivo"
    document.getElementById("buttonDelete").id = "nevidljivo"
    console.log(noviRed)
    let indeks = noviRed.rowIndex
    const ajaxUpdateKnjigu = new XMLHttpRequest()
    ajaxUpdateKnjigu.onreadystatechange = function () {
        if(ajaxUpdateKnjigu.readyState === 4 && ajaxUpdateKnjigu.status === 200) {

        }
        else if (ajaxUpdateKnjigu.readyState === 4 && ajaxUpdateKnjigu.status === 404)
            console.log("Greska")
    }
    document.getElementById("buttonUpdate").onclick = function () {
        console.log(dajIdKnjige(noviRed.cells[0]))
        ajaxUpdateKnjigu.open("PUT", "http://127.0.0.1:3000/knjiga" + dajIdKnjige(noviRed.rows[indeks].cells[0]))
        ajaxUpdateKnjigu.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        ajaxUpdateKnjigu.send(JSON.stringify({naziv: document.getElementById("inputNaziv").value,
                                                    datum_izdavanja: document.getElementById("inputGodina").value,
                                                    PisacId: nadjiIdPisca(document.getElementById("select").value)}))
        window.close()
    }

}

function deleteFunkcija() {

}

function cancelFunkcija() {

}