"use strict";
console.log(data);
var rastiLista = sortRasti(data.rastit);
var rastiTaulu = rastiLista;

window.onload = function() {
    // executes when complete page is fully loaded, including all frames, objects and images


	var mymap = L.map('mapid').setView([62.13000, 25.62], 11);
    
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.satellite'
        }).addTo(mymap);
        

        var circle = L.circle(
            [62.2325, 25.7355], {
                color: 'red',
                fillcolor: null,
                radius: 100               
            }
            ).addTo(mymap);
        
        circle.bindPopup('Jiihaa!');

        let koords = [[62.2325, 25.7355],[62.2333,25.7333],[62.23, 25.73],[62.232, 25.7222]]; 
        let polyline = L.polyline(koords, {color: 'blue'}).addTo(mymap);


        //listaa kaikki rastit
        let b = [];
        for (let id in rastiTaulu) {
            let a = {};
            a.koodi = rastiTaulu[id].id;
            a.lat = rastiTaulu[id].lat;
            a.lon = rastiTaulu[id].lon;
            b.push(a);
            piirraYmpyra(a.lat, a.lon, mymap);
        }
        console.log(b);
        var teemu = data.joukkueet[0];
        var ce = piirraViiva(teemu,b);

        var firstpolyline = new L.Polyline(ce, {
            color: 'white',
            weight: 3,
            smoothFactor: 1
        });
        firstpolyline.addTo(mymap);
}

function haeRastit(joukkue, b) {
    let rastit = [],
        i = 0,
        length = joukkue.rastit.length;
    for (; i < length; i++) {
        rastit.push(joukkue.rastit[i]);
    }
    console.log(rastit);
    return rastit;
}

function piirraViiva(joukkue, b){
    let x = haeRastit(joukkue, b);
    let a = [];
    for(let id in x){
        let c = {};
        if (id.id == b.id){
        c.lat = b[id].lat;
        c.lon = b[id].lon;
        a.push(c);
        }
    }
    console.log(a);
    return a;
}

function piirraYmpyra(x,y, mappi){
    var circle = L.circle(
        [x, y], {
            color: 'red',
            radius: 150
        },
        ).addTo(mappi);
    }


//aakkostaa rastit VT2
function jarjestaRasti() {
    let c = [];
    c = listaaRasti();
    c.sort(function (a, b) {
        let koodiA = a.koodi,
            koodiB = b.koodi;
        if (koodiA < koodiB) {
            return -1;
        }
        if (koodiB < koodiA) {
            return 1;
        }
    });

    rastiTaulu = c;
}

// listaa rastien koodit ja lat/lon arvot taulukkoon ja palauttaa sen VT2
function listaaRasti() {
    let b = [];
    for (let id in rastiTaulu) {
        let a = {};
        a.koodi = rastiTaulu[id].koodi;
        a.lat = rastiTaulu[id].lat;
        a.lon = rastiTaulu[id].lon;
        b.push(a);
    }
    return b;
}

//Validoi rastisyötteet sortRasti :lle, VT2
function sortRasti(b) {
    let apuRastit = {},
        i = 0,
        length = b.length;
    for (; i < length; i++) {
        if (parseInt(b[i].koodi[0])) {
            b[i].pisteet = b[i].koodi[0];
        } else {
            b[i].pisteet = 0;
        }
    }
    apuRastit = sorter(b);
    return apuRastit;
}

function sorter(c) {
    let apuJarjestys = {},
        i = 0,
        length = c.length;
    for (; i < length; i++) {
        apuJarjestys[c[i].id] = c[i];
    }
    return apuJarjestys;
}