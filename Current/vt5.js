"use strict";
console.log(data);
var rastiLista = sortRasti(data.rastit);
var rastiTaulu = rastiLista;
var joukkuelista = sortJoukkue(data.joukkueet);

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
		
		    listaaJoukkue();
    tulostaJoukkueet();
	
}

$(document).ready() 
    // executes when complete page is fully loaded, including all frames, objects and images

    $("#items1,#items2").sortable({
        connectWith: "#items1,#items2",
        start: function (event, ui) {
                ui.item.toggleClass("highlight");
        },
        stop: function (event, ui) {
                ui.item.toggleClass("highlight");
        }
    });
    $("#items1,#items2").disableSelection();

    $('ul').on('mouseup', 'li', function(){
        console.log(document.getElementById("items1").getElementsByClassName("list g"));
    })

    document.getElementById("items1").addEventListener("drop",function(e) {
        if (e.target && e.target.matches("li.list g")) {
            var lis = document.getElementById("items1").getElementsByClassName("list g");

          }
      });



   
;


function drop(){
var lis = document.getElementById("items1").getElementsByClassName("list g");
console.log(lis);
}

function tulostaJoukkueet() { 
    data.joukkueet.sort((a, b) => a.nimi.localeCompare(b.nimi)); //sort
    var lista = document.getElementById("items2");
    var uli = document.createElement("ul"); 

    for (let i in data.joukkueet) { 
        var li = document.createElement("li");
        li.className = "list g";
        li.style.backgroundColor = rainbow(19, i);
        li.appendChild(document.createTextNode(data.joukkueet[i].nimi)); 
        lista.appendChild(li); 
    }
    //lisaaJoukkue();   päivittäisi VT2:sen listan
}


// Listaa joukkueet   VT2/VK3
function listaaJoukkue() {
    let joukkueet = [];
    for (let i in joukkuelista) {
        joukkueet.push({
            nimi: joukkuelista[i].nimi,
            id: i
        });
    }
    return joukkueet;
}

//aakkostaa joukkuelistan
function sortJoukkue(b) {
    let a = {},
        i = 0,
        length = b.length;
    for (; i < length; i++) {
        b[i].pisteet = 0;
    }

    a = sorter(b);

    return a;
}
//apufunktio, aakkostaa sortJoukkue :elle
function sorter(c) {
    let apuJarjestys = {},
        i = 0,
        length = c.length;
    for (; i < length; i++) {
        apuJarjestys[c[i].id] = c[i];
    }
    return apuJarjestys;
}

//hakee joukkueen jäsenet
function haeJasenet(joukkue) {
    let jasenet = [],
        i = 0,
        length = joukkue.jasenet.length;
    for (; i < length; i++) {
        jasenet.push(joukkue.jasenet[i]);
    }
    return jasenet;
}

//hakee rastit
function haeRastit(joukkue) {
    let rastit = [],
        i = 0,
        length = data.rastit.length;
    for (; i < length; i++) {
        rastit.push(data.rastit[i]);
    }
    return rastit;
}





function etsiJoukkue(joukkueID) {
    for (let i in data.joukkueet) {
        if (data.joukkueet[i].id === joukkueID) {
            return i;
        }
    }
}

function etsiRasti(rastiID) {
    for (let i in data.rastit) {
        if (data.rastit[i].id === rastiID) {
            return i;
        }
    }
}

function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    let r, g, b;
    let h = step / numOfSteps;
    let i = ~~(h * 6);
    let f = h * 6 - i;
    let q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    let c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
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






