
// TERAZ I POZNIEJ W PRAKTYCE

setTimeout(() => {
    //console.log('Pozniej!');
}, 3000);

console.log('Teraz');

// λ node Programowanie_asynchroniczne_w_JavaScript.js
// Teraz
// Pozniej!

// EVENT LOOP W PRAKTYCE
setTimeout(() => { // setTimeout zawsze jest przesuwane do 'pozniej'
    console.log('A');
},1000); // po uplywie sekundy lub pozniej

console.log('b'); // dodanie wywolania do kolejki

// b
// A

// podejscie synchroniczne - deterministyczne - ZAWSZE OTRZYMUJEMY TA SAMA KOLEJNOSC
let arr = [];

function addValue(v) {
    arr.push(v)
}

function logArr() { // wyswietlenie tablicy w kodzie async
    if (arr.length === 2) console.log(arr);
}

function get3() {
    addValue(3);
    logArr()
}

function get5() {
    addValue(5);
    logArr()
}

get3();
get5();
console.log(arr); // [3,5]

// podejscie asynchroniczne
// nie jestesmy nigdy zagwarantowac kolejnosci odpowiedzi

setTimeout(get3, 1000);
setTimeout(get5, 1000);

console.log(arr); // [] wykonanie w zakresie teraz, gdzie funkcje sa w pozniej

// KORDYNACJA DZIALAN - ustalanie kolejnosci
let arr = [];

function addValue(v) {
    v === 3 ? arr[0] = v : arr[1] = v; // kordynacja dzialan
}

function logArr() {
    if (arr[0] !== undefined && arr[1] !== undefined) console.log(arr);
}

function get3() {
    addValue(3);
    logArr();
}

function get5() {
    addValue(5);
    logArr();
}

setTimeout(get3, Math.random() * 3000);
setTimeout(get5, Math.random() * 3000);

// CALLBACK  - wywolania zwrotne
setTimeout(function () { // setTimeout z gory narzuca async
    console.log('a');
});

console.log('b');

// b
// a

var values = [1,2,3];

values.forEach(v => console.log(v)); // callback w kontekscie synchronicznym

console.log('OK');

// 1
// 2
// 3
// OK

// CALLBACK - podstawowe techniki

function showValue(v) { // uzycie domkniecia
    return function() { // zwrotna funkcja wewnetrzna
        console.log(v);
    }
}

function showValue2(v) {
    console.log(v);
}

setTimeout(showValue(3),100);
setTimeout(showValue2,100, 3); // przekazanie referencji do funkcji wraz z argumentem

// ZAGNIEZDZONY CALLBACK

setTimeout(function () {
    console.log('1');
    setTimeout(function () {
        console.log('2');
    },1000);
},1000);

// UZYCIE CALLBACK W PRZEGLADARCE
var names = ['swift', 'php', 'javascript', 'closue'];

document.addEventListener('DOMContentLoaded', function () {
    names.forEach(function(name) {
        setTimeout(function () {
            let node = document.createElement('p');
            let textNode = document.createTextNode(`${name}`);
            node.appendChild(textNode);
            document.querySelector('#main').appendChild(node);
        },2000);
    })
});

// PANOWANIE NAD CALLBACK
document.addEventListener('DOMContentLoaded', eventCallback(2000, createTextElement, names));

function eventCallback(timeout, callback, callbackParam) {
    setTimeout(callback, timeout, callbackParam);
}

function createTextElement(namesList) {
    namesList.forEach(function(name) {
        setTimeout(function () {
            let node = document.createElement('p');
            let textNode = document.createTextNode(`${name}`);
            node.appendChild(textNode);
            document.querySelector('#main').appendChild(node);
        },2000);
    })
}

// CALLBACK W NODEJS
let request = require('request'); // pobranie modulu request dla nodejs

request('https://jsonplaceholder.typicode.com/posts/1', function (error, response, body) { // error zawsze first w node
    console.log(error); // brak bledow zwraca null
    console.log(body);
});

// THUNK
// funkcja ktora w momencie wywolania posiada wszystko co jest potrzebne do zwrocenia wartosci i nie potrzebuje
// zadnego argumentu
// wrapper/opakowanie dla jakiegos stanu/wartosci
// pomaga zrozumiec Promise
// niezbedne do pracy z generatorami

// SYNCHRONICZNY THUNK
var thunk = function() { // wrapper dla consolelog
    console.log('1'); // zachowanie opakowane w funkcje
};

thunk(); // wywolanie wrappera

function double(v) {
    return v * 2;
}

var thunk2  = function () { // wrapper dla funkcji double
    return double(3);
};

thunk2(); // 6
// ASYNCHRONICZNY THUNK
function doubleAsync(v, callback) {
    setTimeout(function () {
        callback(v * 2);
    },1000);
}

var thunk  = function (callback) { // wrapper dla funkcji doubleAsync
    doubleAsync(3, callback);
};

thunk(function (result) {
    console.log(result);
}); // 6

// ASYNCHRONICZNY THUNK - kolejny przyklad
let request = require('request');

let getPost1 = getResource('https://jsonplaceholder.typicode.com/posts/1');
let getPost2 = getResource('https://jsonplaceholder.typicode.com/posts/2');

getPost1(function (error, response, body) {
    console.log(body);
    getPost2(function (error, response, body) {
        console.log(body);
    })
});

function getResource(url) {
    return function (callback) {
        request(url, callback);
    }
}

// koncepcja PROMISE
// PROMISE to obiekt, obietnica przyszlej wartosci
// placeholder dla przyszlej wartosci
// obietnica ktora mozemy w przyszlosci zamienic na wartosc
// mozliwy jest zarowno sukces jak i porazka

// przyklad uzycia

let request = require('request');

let p1 = getResource('https://jsonplaceholder.typicode.com/posts/1'); // obiekt promise
let p2 = getResource('https://jsonplaceholder.typicode.com/posts/2'); // obiekt promise
let p3 = getResource('httpss://jsonplaceholder.typicode.com/posts/3'); // obiekt promise

function getResource(url) { // zwraca nowy obiekt promise
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (error) reject(error);
            else { resolve(body) }
        })
    })
}

function logText(body) { console.log(body); }

// jak korzystamy - lancuch obietnic, najpierw p1, potem p2
p1.then(logText)
    .then(function() {
            return p2;
        })
    .then(logText).then(function () {
        return p3;
}).then(logText)
    .catch(logText); // catch na koncu przechwytuje bledy ze WSZYSTKICH then

// wazne cechy PROMISE
// promise bedzie rozwiazane tylko JEDEN raz, z jedna wartoscia/tablica/obiektem

var p1 = new Promise(function (resolve, reject) {
    resolve(10); // obietnica natychmiast/odrazu spelniona
    resolve(10);
    resolve(10);
    // wyswietli sie tylko 1x 10
    resolve(1, 2, 3); // tylko 1
});

p1.then(function (v) { // callback then jest zawsze asynchroniczny - 'Potem'
    console.log(v);
});

console.log('Start'); // 'teraz'

// Wzorzec All dla Promise
// metoda all na wejsciu przyjmuje tablice bedace zbiorem promise w celu kordynacji dzialan

function logText(body) { console.log(body); }

let p1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
       resolve(1);
    }, Math.random() * 4000); // wykonanie losowa w 1-4s
});


let p2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(2);
    }, Math.random() * 4000); // wykonanie losowa w 1-4s
});

// metoda all
// przyjmuje tablice
// wykonanie DOPIERO po spelnienu wszystkich obietnic
Promise.all([p1, p2]).then(logText);

// Wzorzec Race
// uwzgledniony zostanie tylko promise ktory zostanie wykonany jako pierwszy, pozostale sa ignorowane

function logText(body) { console.log(body); }

let p1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(1);
    }, Math.random() * 4000); // wykonanie losowa w 1-4s
});


let p2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(2);
    }, Math.random() * 4000); // wykonanie losowa w 1-4s
});

// metoda race
// przyjmuje tablice
// wykonanie dla pierwszej spelnionej obietnicy
Promise.race([p1, p2]).then(logText);

// Run to completion
// obecne zadanie jest zawsze wykonywane do konca zanim moze sie rozpoczac kolejne zadanie
// gwarancja ze funkcja moze byc wykonana bez ingerencji ze strony zewnetrznego kodu

let a = 1;

function fn1() {
    a++;
    console.log(a);
}

function fn2() {
    a++;
}

fn1();
fn2(); // fn2 nie ingeruje w cialo funkcji fn1

// GENERATORY
// funkcja z pauza
// wymagany iterator

let a = 1;

function *fn() { // funkcja generatora
    a++;
    yield; // yield - pauza
    console.log(a); // wykonanie po pauzie
}

let it = fn(); // iterator do kontroli generatora fn()

function increment() {
    a++;
}

it.next(); // uruchamiamy generator

console.log(a); // wykonanie podczas pauzy w funkcji fn()
increment(); // wykonanie podczas pauzy w funkcji fn()

it.next(); // pozostaly fragment fn ()

// yield oraz wartosci

function *generator() {
    yield 10; // pauza ze zwracana wartoscia
    yield 20; // pauza ze zwracana wartoscia
    yield 30; // pauza ze zwracana wartoscia
}

let it = generator(); // iterator do kontroli instancji generatora
let result = it.next();
console.log(result); // { value : 10, done : false}
result = it.next();
result = it.next();
console.log(result); // { value : 30, done : false}
result = it.next();
console.log(result);// { value : undefined, done : true}

// wysyłanie wiadomosci do generatora

function add10(v) {
    console.log(v + 10);
}

function *generator() {
    let value = yield;
    console.log(value); // 5
    add10(value); // 15

}

let it = generator();
it.next(); // uruchomienie generatora
it.next(5); // przekazanie wartosci

// generatory i asynchronicznosc

function asyncFn(value) {
    setTimeout(function () {
        it.next(value * 2); // drugie wywolanie next
    }, 2000);
}

function *generator() {
    let result = yield asyncFn(2); // yield oczekuje na wartosc z kolejnego wywolania
    console.log(result); // 4
}

let it = generator();
it.next(); // start generatora

// ASYNC/AWAIT
// element es2017
// warstwa abstrakcji zbudowana na promise
// async definiuje funkcje asynchroniczna
// await oczekuje na rezulta dzialania innej funkcji asynchronicznej
// await powinno byc wewnatrz funkcji async

// async - podstawowy przyklad

async function fn() { // funkcja asynchroniczna
    let p1 = new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(10);
        }, 1000);
    });
    console.log(await p1); //oczekuj na spelnienie obietnicy i przypisz wartosc
}

fn();

// async - praktyczne podejscie
// operacje sekwencyjne i rownolegle

let request = require('request');

function getResource(url) { // zwraca nowy obiekt promise
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (error) reject(error);
            else { resolve(body) }
        })
    })
}

async function getData() { // za pomoca async i await czekamy na rezultat getResource
    try { // obsluga bledow

        // wykonanie sekwencyjne - po kolei
        console.time('Start');
        let post1 = await getResource('https://jsonplaceholder.typicode.com/posts/1'); // obiekt promise
        let post2 = await getResource('https://jsonplaceholder.typicode.com/posts/2'); // obiekt promise
        let post3 = await getResource('https://jsonplaceholder.typicode.com/posts/3'); // obiekt promise
        conosole.log(post1, post2, post3);
        console.timeEnd('Start'); // ~ 350ms

        // wykonanie rownolegle
        console.time('Start');
        let post1 = getResource('https://jsonplaceholder.typicode.com/posts/1'); // obiekt promise
        let post2 = getResource('https://jsonplaceholder.typicode.com/posts/2'); // obiekt promise
        let post3 = getResource('https://jsonplaceholder.typicode.com/posts/3'); // obiekt promise
        let [p1,p2,p3] = await Promise.all([post1,post2,post3]); // destrukturyzacja
        console.log(p1, p2, p3);
        console.timeEnd('Start'); // ~ 150ms

    } catch (e) {
        console.log(e);
    }

}

getData();

// Observable
// programowanie reaktywne - reagujace na zdarzenia
// programowanie z uzyciem asynchronicznych strumieni danych
// implementujemy za pomoca biblioteki RxJS

// RjXS podstawy

let inputStream = Rx.Observable.of(1, 2, 3, 4); // tworzymy observable na podstawie wartosci

// zapisanie sie do strumienia
inputStream.subscribe(function (v) { // callback w momencie gdy w observable pojawi sie nowa wartosc
    console.log(v); // 1 2 3 4
});

// RjXS koncepcje

let inputStream = Rx.Observable.of(1, 2, 3, 4); // tworzymy observable na podstawie wartosci
let outputStream = inputStream.map(value => value * 2); // strumien utworzony na podstawie inputStream

outputStream.subscribe(function (v) {
    console.log(v);
});

// RjXS praktyka

let requestStream = Rx.Observable.of(
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
);

let responseString = requestStream; // strumien odpowiedzi

responseString.flatmap(function (url) { // funkcja z rxjs
    return Rx.Observable.fromPromise(fetch(url)); // wyslanie zadania do urla, fetch zwraca promise
});

responseString.subscribe(function (data) {
    console.log(data);
});















