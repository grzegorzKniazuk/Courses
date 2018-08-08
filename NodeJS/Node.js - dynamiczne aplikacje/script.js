let welcome = require('./functions'); // import modulu
let info = require('./info'); // import modulu
let events = require('events'); // import modulu z node
let readline = require('readline'); // import modulu z node
welcome(); // uzycie funkcji z modulu
info.infoPolish(); // uzycie funkcji z modulu

let path = require('path'); // importowanie modulu wbudowanego w node

// uzycie zaimportowanego wbudowanego modulu node
let baseName = path.basename('/users/files/documents');
console.log(baseName); // documents

// callback
function showInfo(callback) {
    console.log('kurs node.js');
    callback();
}
showInfo(() => { console.log('callback zostal wywolany') });

// zdarzenia
let emitter = new events.EventEmitter(); // emiter zdarzen w node

function showGreetings(name) { console.log(`Witaj ${name}`)}

emitter.on('userRegistered', showGreetings); // jaka funkcja zostanie wywolane dla danego zdarzenia
emitter.once('userRegistered', showGreetings); // zdarzenie rejestrowane tylko raz - raz moze byc wywolane

emitter.emit('userRegistered', 'Grzegorz'); // emitowanie zdarzenia

// obiekt procesu
// - obiekt procesu serwera node
console.log(process.env); // funkcji jest wiele wiecej
console.log(process.platform); // funkcji jest wiele wiecej

// input, output
process.stdout.write('Jak masz na imie?\n'); // wyjscie
//process.stdin.on('name', function (name) {
//    console.log(name.toString());
//    process.abort(); // zakoncz program
//}); // wejscie

// timery w node
let currentTime = 0;

/*let interval = setInterval(() => {
    currentTime += 1000;
   console.log(`${currentTime/1000}s`);
}, 1000);*/

/*setTimeout(() => {
    clearInterval(interval); // przerwanie setInterval
}, 10000);*/

// modul readline
// - odczytywanie wartosci z lini, czy to z pliku czy z konsoli
let readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

readLine.question('Jak masz na imie?', (answer) => { // metoda "pytajaca"
    console.log(answer);
    readLine.setPrompt('Jaki jest Twoj ulubiony jezyk programowania?'); // przygotowanie pytania
    readLine.prompt(); // wywolanie pytania
    readLine.on('line', (language) => {
        console.log(language);
    });
    readLine.close();
});





































