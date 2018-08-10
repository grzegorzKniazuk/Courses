let event = require('events');
let http = require('http');
let fs = require('fs');
let Module = require('./modules/modules');
let dns = require('dns');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// zdarzenia
let eventEmitter = new event.EventEmitter();
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

// modul dns
// uzyskanie adresu ip danego hosta
dns.lookup('www.wp.pl', (error, address, family) => {
    console.log(`Adres wp.pl: ${address}`);
});

// modul http
// pobieranie strony html
let options = {
    hostname: 'www.wp.pl',
    method: 'GET',
};

let request = http.request(options, (response) => {
    console.log(`Status: ${response.statusCode}`); // kod statusu
    console.log(`Headers: ${JSON.stringify(response.headers)}`); // naglowki

    response.setEncoding('UTF-8');

    let htmlCode = '';
    response.on('data', (data) => {
        console.log(data); // kod zrodlowy strony
        htmlCode = data;
    });
    response.on('end', () => {
        fs.writeFile('wp.html', htmlCode, (error) => {
            if (error) {
                throw new Error(error);
            }
        })
    });
}).end();

// framework Express
mongoose.connect('mongodb://localhost:27017/db');

let database = mongoose.connection;

database.on('connected', () => {
    console.log('Połaczono z MongoDB...');
});
database.on('error', () => {
    throw new Error('Błąd połączenia');
});

// zrywanie polaczenia jesli proces node'a zakonczy sie
process.on('SIGINT', () => {
   mongoose.connection.close(() => {
       console.log('Polaczenie zakonczone przez aplikacje.');
       process.exit();
   })
});

// model obiektu
let BlogSchema = mongoose.Schema({

    // walidacja wymaganego pola po stronie serwera
    author: { type: String, required: true },
    text: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    date: { type: Date, default: Date.now() },
});
let Blog = mongoose.model('Blog', BlogSchema);

// routing, post, get
router.get('/', (request, response) => {

    // wpisy z tabeli
    Blog.find((error, list) => {
        if (error) {
            throw new Error(error);
        } else {
            response.json(list);
        }
    })
});

router.post('/', function (request, response) {
   let blog = new Blog({
       author: request.body.author,
       text: request.body.text,
       title: request.body.title,
       desc: request.body.desc,
   });
    blog.save((error) => {
        if (error) {
            throw new Error(error);
        } else {
            response.json({ msg: 'Wpis zostal dodany.' });
        }
    })
});
