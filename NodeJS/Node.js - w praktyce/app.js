const utils = require('util'); // pomocne funkcje
const EventEmitter = require('events'); // modul events
const readline = require('readline'); // modul readline
const fs = require('fs'); // modul filesystem
const gzip = require('zlib').createGzip(); // modul do kompresji strumieni do *.gz
const Console = require('console').Console; // modul do logow
const path = require('path'); // modul path
const net = require('net'); // modul net
const http = require('http'); // modul http
const https = require('https'); // modul https
const mongoose = require('mongoose'); // modul mongoose
const cluster = require('cluster'); // modul cluster

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

// modul Stream
// obsluga binarna plikow
let stream = fs.createReadStream('./text.txt', {
    highWaterMark: 32 * 1024 // wielkosc odczytywanych partii danych w bajtach
});
stream.on('data', (chunk) => {
    console.log(chunk.toString());
});
stream.pipe(process.stdout);

let logs = fs.createWriteStream("./logs.txt");
let errors = fs.createWriteStream("./errors.txt");
const myConsole = new Console();
myConsole.log('to dziala');

// modul process
console.log(process.pid); // id procesu
console.log(process.argv); // argumenty uruchomionego procesu

// modul readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('question here', (answer) => {
    console.log(answer);
});

// system plikow
// odczytywanie informacji o plikach
// czy plik istnieje?
fs.exists(path.join('document','files','index.html'), (isExists) => { // asynchroniczna
    console.log(isExists); // true/false
});

// odczytywanie informacji o plikach/katalogach
fs.stat(path.join('document','files','index/html'), (error, status) => { // error-first callback

});

// odczytywanie zawartosci katalogu
fs.readdir(path.join('./'), (error, files) => {
    if (error) {
        throw new Error(error);
    } else {
        console.log(files);
    }
});

// odczytywanie zawartosci pliku
fs.readFile(path.join('file.txt'), 'utf8', (error, data) => { // asynchroniczna
    if (error) {
        throw new Error(error);
    } else {
        console.log(data);
    }
});

// tworzenie plikow i katalogow, zapis do plikow i katalogow
fs.mkdir('files', (error) => {
    if (error) {
        throw new Error(error);
    }
});

// tworzenie pliku
fs.writeFile(path.join('./', 'file2.txt'), 'zawartosc pliku', 'utf8', (error) => {
    if (error) {
        throw new Error(error);
    }
});

// zapis na koniec danego pliku
fs.appendFile(path.join('file.txt'), 'dodatkowa zawartosc', 'utf8', (error) => {
    if (error) {
        throw new Error(error);
    }
});

// tworzenie katalogu tymczasowego
fs.mkdtemp(path.join('_temp-'), (error, dir) => {
   if (error) {
       throw new Error(error);
   } else {
       console.log(dir);
   }
});

// przenoszenie plikow, katalogow, zmiana nazw
// zmiana nazwy
fs.rename(path.join('file.txt'), path.join('file.txt'), (error) => {
    if (error) {
        throw new Error(error);
    }
});

// przenoszenie pliku wraz ze zmiana nazwy
fs.rename(path.join('file.txt'), path.join('files', 'file.txt'), (error) => {
    if (error) {
        throw new Error(error);
    }
});

// usuwanie plikow i katalogow
fs.rmdir(path.join('files'), (error) => {
    if (error) {
        throw new Error(error);
    }
});

// czyszczenie katalogu z plikow
function rmdir(dir, cb) {
    let dirname = path.join(__dirname, dir);
    fs.rmdir(dirname, (error) => {
        if (error) {
            if (error.code !== 'ENOTEMPTY') { // jesli blad jest inny niz "katalog nie jest pusty"
                return cb(error, dir);
            }
            // tutaj kod usuwania plikow
        } else {
            cb(null, dir);
        }
    })
}

rmdir('files', function (error, dirname) {
    if (error) {
        throw new Error(error);
    } else {
       console.log(`Usunięto katalog: ${dirname}`);
    }
});

// obserwowanie zmian w plikach/katalogach
fs.watch(path.join('file.txt'), (eventType, filename) => {

});

// tworzenie serwerów
// modul net, serwer na "niskim" poziomie, http z niego korzysta
const server = net.createServer((socket) => { // socket to stream
    socket.write('Hello World!');
    socket.end(); // zakonczenie streamu
}).listen(3000, () => {
    console.log('Serwer został uruchomiony pod adresem 127.0.0.1:8080');
});

const client = net.connect({port: 3000});

// modul http
const server = http.createServer((request, response) => { // request i response to streamy
    response.writeHead(200, { // przegladarka "wie" jaki content dostanie
        "Content-Type": "text/html",
    });

    response.write(request.httpVersion); // wersja http
    response.write(request.url); // pod jakim adresem sie znajdujemy
    response.write('<b>Hello World!</b>');
    response.end();
}).listen(3000);

// expressjs
const express = require('express');
const app = express();

app.get('/', (request, response) => { // sciezka dla get
    response.send('Hello World!');
}).listen(3000, (error) => {
    if (error) {
        throw new Error(error);
    } else {
        console.log('Serwer uruchomiony...');
    }
});

// co mozna wylaczyc
app.disable('x-powered-by'); // m.in

// serwowanie statycznych plikow
app.use(express.static('public')); // z katalogu public

// routing zapytan z parametrami
app.get("blog/:date?/:id", (request, response) => { // ? - parametr opcjonalny
   response.send({
       date: request.params.date,
       id: request.params.id,
       query: request.query, // query podane po ? w adresie
   })
});

// middleware
// funkcja ktora ma sie wykonac dla kazdego polaczenia
app.use((request, response, next) => {
    response.removeHeader('x-powered-by');
    next(); // wymagane
});

// middleware dla konkretnej sciezki
app.use('/admin', (request, response, next) => {

    response.redirect('/'); // przekierowanie po stronie expressa
});

// api typu REST
app.get('/api/users/:id', (request, response) => {
   response.json({ // wyslanie jsona jako zwrotka z api
       id: 5,
       name: 'Grzegorz',
       surname: 'Kniazuk',
   });
    response.json(users.get(request.params.id)); // uzycie params
});

// aktualizacja pojedynczego uzytkownika
app.put('/api/users/:id', (request, response) => {

});

// mongoDB
const user = 'user';
const password = 'password';
mongoose.connect(`mongodb://${user}:${password}@ds033966.mlab.com:33966/kurs_node`);

let schema = new mongoose.Schema({
    name: String,
    lastName: String,
});

let User = mongoose.model('User', schema);

function listUsers() {
    User.find({}, () => {

    });
}
*/
// websockets
// obsluga stanow w http
// ws - popularny modul do obslugi websockets
// socket.io - popularna biblioteka

// wykorzystanie Promises
function readFile(file, cb) {
    let p = new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, "files", file), (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data.toString());
            }
        })
    });
    return p;
}

readFile('plik.txt').then(data => {
   console.log(data);
}).catch(error => {
    console.log(error);
});

// klasterowanie
// uruchomienie tylu klastrow ile jest rdzeni procesora
// sa dodatki w npm
if (cluster.isMaster) {
    let cpus = require('os').cpus().length;

    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', () => {
        cluster.fork();
    })
}







