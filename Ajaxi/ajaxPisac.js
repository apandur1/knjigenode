function formatiraj_datum(datum) {
    let niz = datum.split("-").filter(s => s !== "")
    return niz[2] + "." + niz[1] + "." + niz[0]
}

function dodajPisca() {
    const dodajPiscaAjax = new XMLHttpRequest()
    dodajPiscaAjax.onreadystatechange = function () {
        if (dodajPiscaAjax.readyState === 4 && dodajPiscaAjax.status === 200) {
            console.log(document.getElementById("inputDatum").value.toString())
            window.alert("Pisac je uspješno dodan")
            window.location.href = "./pocetna.html"
        }
        else if (dodajPiscaAjax.readyState === 4 && dodajPiscaAjax.status === 404)
            console.log("Greska")
    }
    dodajPiscaAjax.open("POST", "http://127.0.0.1:3000/pisac")
    dodajPiscaAjax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    dodajPiscaAjax.send(JSON.stringify({ime: document.getElementById("inputIme").value,
                                            prezime: document.getElementById("inputPrezime").value,
                                            datum_rodjenja: formatiraj_datum(document.getElementById("inputDatum").value.toString()),
                                            nobelovac: document.getElementById("radio").checked ? "Da" : "Ne"}))
}