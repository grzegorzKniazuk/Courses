let event = require('events');
let http = require('http');
let fs = require('fs');
let Module = require('./modules/modules');
/*
// zdarzenia
let eventEmitter = new events.EventEmitter();
eventEmitter.on('exampleEvent', (message, status) => {
    console.log("Status: "+message);
});
eventEmitter.emit('exampleEvent', 'Tresc', 200);

// modul http

http.createServer((request, response) => {
    response.write('Hello World');
    response.end();
}).listen(3333);

// uzycie wlasnego modulu
let s = new Module('Grzegorz', 'Kniażuk');
console.log(s.showStudent());

// obsluga plikow - modul gs
// odczyt z pliku - synchroniczny
let textFile = fs.readFileSync('text.txt', 'utf-8');

// odczyt z pliku - asynchroniczny
let asyncTextFile = fs.readFile('text.txt', (error, data) => {
    if (error) {
        throw new Error(error);
    } else {
        console.log(data.toString());
    }
});

// zapis do pliku
// nadpisanie zawartosci pliku
fs.writeFile('fileToWrite.txt', 'to jest tekst', (error) => {
    if (error) {
        throw new Error(error);
    }
});

// dopisanie do zawartosci pliku
fs.appendFile('fileToWrite.txt', 'to jest tekst', (error) => {
    if (error) {
        throw new Error(error);
    }
});

// odczyt z katalogow
// asynchroniczne
fs.readdir('./', (error, list) => {
    if (error) {
        throw new Error(error);
    } else {
        console.log(list);
    }
});

// tworzenie katalogow
fs.mkdir('nowyKatalog', (error) => {
    if (error) {
        throw new Error(error);
    }
});

// usuwanie katalogow
fs.rmdir('nowyKatalog', (error) => {
    if (error) {
        throw new Error(error);
    }
});

// wyswietlenie zawartosci pliku w html
// asynchroniczne
function loadData(callback) {
    fs.readFile('text.txt', (error, data) => {
        if (error) {
            throw new Error(error);
        } else {
            callback(data.toString());
        }
    })
}

http.createServer((request, response) => {
    loadData(function (data) {
        response.write(data);
        response.end();
    })
}).listen(3333);
*/


