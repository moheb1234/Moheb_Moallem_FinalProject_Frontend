let xmlHttpRequest

export function getAll() {
    let url = "http://localhost:8000/"
    xmlHttpRequest = new XMLHttpRequest()
    xmlHttpRequest.open('GET', url, true)
    xmlHttpRequest.onload = function () {
        if (xmlHttpRequest.status === 200) {
            localStorage.clear()
            let films = JSON.parse(xmlHttpRequest.responseText)
            for (const film of films) {
                let f = {id: film[0], name: film[1], year: film[2], explain: film[3], picture: film[4]}
                localStorage.setItem(f.id, JSON.stringify(f))
            }
        } else {

        }

    }
    xmlHttpRequest.send()
}

export function findByName(filmName) {
    let uri = "http://localhost:8000/?name=" + filmName
    xmlHttpRequest = new XMLHttpRequest()
    xmlHttpRequest.open("GET", uri)
    xmlHttpRequest.onload = function () {
        if (xmlHttpRequest.status === 200) {
            let film = JSON.parse(xmlHttpRequest.responseText);
            localStorage.clear()
            let f = {id: film[0][0], name: film[0][1], year: film[0][2], explain: film[0][3], picture: film[0][4]}
            localStorage.setItem(f.id, JSON.stringify(f))
        }
        if (xmlHttpRequest.status===404){
            localStorage.clear()
        }
    }
    xmlHttpRequest.send()
}

export function filterByConstructionYear(year) {
    let uri = "http://localhost:8000?year=" + year
    xmlHttpRequest = new XMLHttpRequest()
    xmlHttpRequest.open("GET", uri, true)
    xmlHttpRequest.onload = function () {
        if (xmlHttpRequest.status === 200) {
            let films = JSON.parse(xmlHttpRequest.responseText)
            localStorage.clear()
            for (const film of films) {
                let f = {id: film[0], name: film[1], year: film[2], explain: film[3], picture: film[4]}
                localStorage.setItem(f.id, JSON.stringify(f))
            }
        }
        if (xmlHttpRequest.status===404){
            localStorage.clear()
        }
    }
    xmlHttpRequest.send()
}

export function insertFilm(name, constructionYear, explain, picture) {
    let uri = "http://localhost:8000"
    xmlHttpRequest = new XMLHttpRequest()
    let film = {name: name, constructionYear: constructionYear, explains: explain, picture: picture}
    let json = JSON.stringify(film)
    xmlHttpRequest.open('POST', uri, true)
    xmlHttpRequest.onload = function () {
        if (xmlHttpRequest.status === 201) {
            getAll()
            alert('successfully saved')
        } else if (xmlHttpRequest.status === 400 || xmlHttpRequest.status === 401) {
            alert(xmlHttpRequest.responseText)
        }
    }
    xmlHttpRequest.send(json)
}

export function updateFilm(filmName, name, constructionYear, explain, picture) {
    let uri = "http://localhost:8000?name=" + filmName
    xmlHttpRequest = new XMLHttpRequest()
    let film = {name: name, constructionYear: constructionYear, explains: explain, picture: picture}
    let json = JSON.stringify(film)
    xmlHttpRequest.open('PUT', uri, true)
    xmlHttpRequest.onload = function () {
        if (xmlHttpRequest.status === 200) {
            getAll()
            alert('successfully updated')
        } else if (xmlHttpRequest.status === 400 || xmlHttpRequest.status === 401 || xmlHttpRequest.status === 404) {
            alert(xmlHttpRequest.responseText)
        }
    }
    xmlHttpRequest.send(json)
}

export function deleteFilm(name) {
    xmlHttpRequest = new XMLHttpRequest()
    let uri = "http://localhost:8000?name=" + name
    xmlHttpRequest.open("DELETE", uri, true)
    xmlHttpRequest.onload = function () {
        if (xmlHttpRequest.status === 200) {
            getAll()
            alert('successfully deleted')
        }
        if (xmlHttpRequest.status === 404) {
            alert(xmlHttpRequest.responseText)
        }
    }
    xmlHttpRequest.send()
}
