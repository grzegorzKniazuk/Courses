const path = require('path');
const utils = require('util'); // pomocne funkcje
const EventEmitter = require('events'); // modul events
const fs = require('fs'); // modul filesystem
/*
// modul Events
let emitter = new EventEmitter();
emitter.on('message', (msg) => {
    console.log(`Wiadomosc: ${msg}`);
});

// emitowanie zdarzenia
emitter.emit('message', 'To jest wiadomość');

// modul Buffer
// bufor przechowujacy dane binarne

let buff = Buffer.from('To jest tekst do bin');
console.log(buff); // <Buffer 54 6f 20 6a 65 73 74 20 74 65 6b 73 74 20 64 6f 20 62 69 6e>
*/

// modul Stream
// obsluga binarna plikow

let stream = fs.createReadStream('./text.txt');
stream.on('data', (chunk) => {

});
