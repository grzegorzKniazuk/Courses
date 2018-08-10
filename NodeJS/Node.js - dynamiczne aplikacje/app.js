let welcome = require('./functions'); // import modulu
let info = require('./info'); // import modulu
let path = require('path'); // importowanie modulu wbudowanego w node
let events = require('events'); // import modulu z node
let readline = require('readline'); // import modulu z node
let http = require('http'); // import http modulu z node
let express = require('express'); // import zainstalowanego expressa
let fs = require('fs'); // import modulu z node - obsluga plikow
let MongoClient = require('mongodb').MongoClient; // import modulu MongoDB
let mongoose = require('mongoose'); // import modulu mongoose
let WebSocketServer = require('ws').Server; // import modulu websockets
welcome(); // uzycie funkcji z modulu
info.infoPolish(); // uzycie funkcji z modulu

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

let interval = setInterval(() => {
    currentTime += 1000;
   console.log(`${currentTime/1000}s`);
}, 1000);

setTimeout(() => {
    clearInterval(interval); // przerwanie setInterval
}, 10000);

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

// modul obslugi plikow
// listowanie plików
// opcja synchroniczna
let fileList = fs.readdirSync('./');
console.log(fileList);

// opcja asynchroniczna
let asyncFileList = fs.readdir('./a', (error, fileList) => {
    if (!error) {
        console.log(fileList);
    } else {
        console.log(error);
    }
});

// odczyt zawartosci plikow
fs.readFile('./notes.txt', 'utf-8', (error, fileContent) => {
    if (!error) {
        console.log(fileContent);
    } else {
        console.log(error);
    }
});

// tworzenie nowych plikow
let content = 'To jest zawartosc';
fs.writeFile('plik.txt', content, (error) => {
    if (error) {
        console.log(error);
    }
});

let html = `
<html>
    <head>

    </head>
    <body>
        To jest body
    </body>
</html>
`;

fs.writeFile('index.html', html, (error) => {
    if (error) {
        console.log(error);
    }
});

// zmiana nazwy i usuwanie plikow
// usuwanie
fs.unlink('index.html', (error) => {
    if (error) {
        console.log(error);
    }
});

// zmiana nazwy pliku
fs.rename('plik.txt, plik2.txt', (error) => {
    if (error) {
        console.log(error);
    }
});

// operacje na katalogach
// tworzenie katalogu
fs.mkdir('nowyKatalog', (error) => {
    if (error) {
        console.log(error);
    }
});

// zmiana nazwy katalogu
fs.rename('nowyKatalog', 'nowyKatalog2', (error) => {
    if (error) {
        console.log(error);
    }
});

// usuwanie katalogu
fs.rmdir('nowyKatalog', (error) => {
    if (error) {
        console.log(error);
    }
});

// uzycie buforów
// bufor jest tablica
let buffer = new Buffer('przykladowy string');
console.log(buffer); // <Buffer 70 72 7a 79 6b 6c 61 64 6f 77 79 20 73 74 72 69 6e 67>
console.log(buffer.toString()); // przykladowy string
console.log(buffer[0]); // 112

// uzycie strumieni
// kopiowanie za pomoca strumienia
let readable = fs.createReadStream('./notes.txt','utf-8');
readable.on('data', (chunk) => {
    console.log(chunk);
});

let writable = fs.createWriteStream('./notes_COPY.txt', 'utf-8');
writable.on('data', (chunk) => {
    console.log(chunk);
});

// potoki
let readable = fs.createReadStream('./notes.txt');
let writable = fs.createWriteStream('./notes_COPY.txt');

// tworzenie potoku - łączenie strumieni, zapis z pliku do pliku
readable.pipe(writable);

// modul HTTP
// definiowanie żądania
http.get('http://strefakursow.pl', (response) => {
    console.log(response.statusCode); // kod odpowiedzi
    response.on('data', (data) => { // dane odpowiedzi
        console.log(data);
    })
});

// tworzenie prostego serwera
http.createServer((request, response) => {
    response.writeHead(200); // stworzenie naglowka odpowiedzi
    response.end('Witaj!'); // odpowiedz serwera
}).listen(3000); // na jakim porcie serwer bedzie dostepny
console.log('Serwer uruchomiony...');

// odpowiedzi typu html
http.createServer((request, response) => {
    response.writeHead(200, { 'content-type': 'text/html' }); // stworzenie naglowka odpowiedzi wraz z definiowanym typem odpowiedzi
    let html = fs.readFileSync('./index.html');
    response.end(html); // odpowiedz serwera
}).listen(3000); // na jakim porcie serwer bedzie dostepny
console.log('Serwer uruchomiony...');

// dynamiczne szablony
http.createServer((request, response) => {
    response.writeHead(200, { 'content-type': 'text/html' });
    let html = fs.readFileSync('./index.html', 'utf-8');
    let text = "it's Alive!";
    html = html.replace('{ text }', text);
    response.end(html);
}).listen(3000);
console.log('Serwer uruchomiony...');

// routing
http.createServer((request, response) => {
    if (request.url === '/') {
        response.writeHead(200);
        response.end('Strona startowa');
    } else if (request.url === '/product') {
        response.writeHead(200);
        response.end('product');
    } else {
        response.writeHead(404);
        response.end('404 - strony nie znaleziono');
    }
}).listen(3000);
console.log('Serwer uruchomiony...');

// odpowiedz typu json
http.createServer((request, response) => {
    let data = {
        id: 456,
        name: 'node.js',
        category: 'js',
    }
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify(data));
}).listen(3000);
console.log('Serwer uruchomiony...');

// strumienie i http
http.createServer((request, response) => {
    response.writeHead(200, { 'content-type': 'text/html' });
    fs.createReadStream('./index.html').pipe(response);
}).listen(3000);
console.log('Serwer uruchomiony...');


// framework Expressjs
let app = express();
app.listen(3000);

// definicja sciezek - routing

app.get('/', (request, response) => {
   response.render('index', { header: 'Witaj na template Jade' }); // uzycie jade
});

app.get('/contact', (request, response) => {
    response.send('contact');
});

app.get('/clients', (request, response) => {
    response.send('clients');
});

app.get('/clients/*', (request, response) => { // * - dowolna zawartosc
    response.send('clients');
});

app.get('/clients/:id', (request, response) => { // sciezka z parametrem
    response.send(`Wartość id: ${request.params.id}`);
});

// jade - plik widoków - definicja silnika widokow
app.set('view engine', 'jade');

// middleware - warstwy posredniczace
// katalog public - tam dajemy pliki statyczne
app.use('/assets', express.static('public'));

// odbieranie parametrow get
app.get('/', (request, response) => {
    response.render('index', { query: request.query.id }); // pobieranie parametru id
});

// polaczenie z mongoDB
let url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, (error, database) => {
    let db = database.db('test');
    if (error) {
        throw new Error(error);
    } else {
        console.log('Połączono z bazą');
        insertUsers(db, () => {
            database.close();
        })
    }
    // database.close(); // zamykanie polaczenia
});

// dodawanie wartosci do bazy mongoDB
let insertUsers = (db, callback) => {

    let collection = db.collection('users');
    let user1 = { 'name': 'user1', 'password': 'samplePassword1' };
    let user2 = { 'name': 'user1', 'password': 'samplePassword1' };
    let user3 = { 'name': 'user1', 'password': 'samplePassword1' };
    let user4 = { 'name': 'user1', 'password': 'samplePassword1' };

    collection.insert([user1, user2, user3, user4], (error, result) => {
        if (error) {
            throw new Error(error);
        } else {
            console.log('dodano do bazy');
            callback(result);
        }
    });
};

// uzycie mongoose
mongoose.connect('mongodb://localhost:27017/test');

let database = mongoose.connection;
database.on('error', () => {
    throw new Error('Błąd połączenia');
});
database.once('open', () => {
    console.log('Połączenie z bazą nawiązane...');

    // mongoose - model
    let articleSchema = mongoose.Schema({
        title: String, // typujemy
        author: String,
        body: String,
    });

    let Article = mongoose.model('articleSchema', articleSchema);

    let article1 = new Article({
        title: 'title',
        author: 'author',
        body: 'sample body...',
    });

    article1.save((error, article1) => {
        if (error) {
            throw new Error(error);
        } else {
            console.log(`Dodano artykuł: ${article1}`);
        }
    })
});
