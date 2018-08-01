// zwracanie funkcji przez funkcje
function fn() {
    return function () {
        return 2 + 4;
    }
}

fn()();

// argumenty funkcji
// stosowanie funkcji do zestawu argumentow
// obiekt arguments
function fn2(x,y) {
    return arguments; // obiekt arguments zawierajacy argumenty
}

console.log(fn2(2,5));

// operator rest
// zwraca tablice argumentow
function fn3(x, y, ...args) { // rest zawsze na koncu
    return args;
}

console.log(fn3(2,3,4,5));

// closures - domknięcia
function fn4(x,y) { // tworzac nowa funkcje tworzymy nowy zasieg
    //var sum = x + y + z + w; // nie mamy dostepu do z i w
   return function (z) { // funkcje maja dostep do wszystkiego co znajduje sie w funkcji rodzicu
       return function (w) {
           return x + y + z + w;
       }
   }
}

console.log(fn4(2,4)(5)(7)); // 18

// deklarowanie funkcji
function multiply(a) {
    return a * 2;
}

// anonimowe wyrazenie funkcyjne
let result = function (a) {
    return a * 2;
};

// anonimowe wyrazenie funkcyjne przy pomocy arrow function
let result2 = (a) => a * 2;

// IIFE - funkcja natychmiastowa
// objecie nawiasem dla stworzenia wyrazenia funkcyjnego
(function fn5() {
    console.log(10);
})();

// natychmiastowe wyrazenie funkcyjne
let result3 = (() => 2)();
console.log(result3); // 2

// FUNKCJE TO TYP PIERWSZOKLASOWY
// TECHNICZNIE FUNKCJE W JS SA OBIEKTEM
function fn6(a) {
    return a * 2;
}

function fn7(b) {
    return b * 2;
}

// przykladowe metody dostepne dla funkcji
console.log(fn6); // [function fn6]
console.log(fn6.name); // [fn6]
console.log(fn6.length); // liczba argumentow, tutaj 1

console.log(fn6(fn7(2))); // 8

// PURE FUNCTIONS
// funkcje czyste
// ZAWSZE ZWRACAJA TA SAMA WARTOSC DLA DANYCH ARGUMENTOW
// funkcja czysta to taka ktora dla danej wartosci wejsciowej zawsze zwroci ta sama wartosc wyjsciowa
// funkcja czysta nie posiada zadnych obserwowalnych efektow ubocznych
// efekty uboczne ktorych funkcja czysta nie powinna posiadac
// interakcja funkcji z zewnetrzym swiatem
// zadanie sieciowe
// zmiana wartosci zewnetrznej zmiennej
// wyprowadzanie wartosci do konsoli
// mutowanie/modyfikowanie danych w aplikacji

let x = 1;

// funkcja nie jest czysta, modyfikuje zewnetrzna wartosc
function double(){ x * 2 };

// funkcja nie jest czysta, wyrzuca wartosci na wyjsciue
function sum(a,b) {
    console.log(a + b);
}

// funkcja czysta, dla c i d zawsze zwroci c * d
const multiplication = (c,d) => c * d;

let e = 10;

// funkcja nieczysta, komunikuje sie ze swiatem zewnetrzym

function divideByTwo() {
    return e / 2;
}

// przyklad funkcji czystej
// przejrzystosc referencyjna
// wartosc zwrocona przez funkcje mozemy zastapic sama wartoscia

let a = 10, b = 20;

function fn8(x,y) {
    return x + y;
}

// przejrzystosc referencyjna
console.log(fn8(a,b)); // 30
console.log(30); // 30

// funkcja nieprzejzysta referencyjnie
function r() {
    return Math.random();
}

// efekty uboczne
let x = 1;

function fn9(y) {
    x++; // efekt uboczny! modyfikacja wartosci globalnej
    return x + y;
}

// NARZEDZIA PROGRAMOWANIA FUNKCYJNEGO
// ilosc argumentow - argumentowosc
// w programowaniu funkcyjnym dazymy do unary


// funkcja unary
// funkcja ktora przyjmuje jeden argument
function identity(id) {
    return id;
}

// funkcja binary
// funkcja ktora przyjmuje dwa argumenty
function sum(a,b) {
    return a + b;
}

// funkcja binary przerobiona na unary
function sumUnary(a) {
    return function (b) {
        return a + b;
    }
}
sumUnary(5)(2);

// funkcja variadic
// funkcja ktora przyjmuje zmienna ilosc argumentow
function variadic(a, ...args) {
    console.log(a);
    console.log(args);
}

// partial application
// zazwyczaj dla funkcji aplikujemy wszystkie argumenty
// jesli czesc argumentow czesto sie powtarza to mozemy je z gory zaaplikowac
// mechanizm partial application mozna roznie zaimplementowac
// celem jest stworzenie prostej funkcji z jednym argumentem

// funkcja binary
function createUser(role, active, name) {
    return [role, active, name];
}

// uzycie metody bind w celu przekazania domyslych parametrow do funkcji
// (bez kontekstu dla this)
let createAdmin = createUser.bind(null, 'admin', true);
// skutkuje to zmniejszeniem ilosci argumentow przekazywanych do funkcji
createAdmin('Placek');

// stworzenie wlasnego partial application
// (bez bind)
function createUser(role, active, name) {
    return [role, active, name];
}

function partial(fn, ...partialArgs) {
    return function (...laterArgs) {
        return fn(...partialArgs, ...laterArgs);
    }
}
let createAdmin = partial(createUser, 'admin', true);
createAdmin('Placek');

// Currying
// Haskell Curry (osoba)
// zamiast wywolywac funkcje ze wszystkimi argumentami naraz to wywolujemy ja krok po kroku po jednym argumencie
// kazde kolejne wywolanie zwraca funkcje oczekujaca na jeden argument
// ROZBIJANIE NA ETAPY Z POJEDYNCZYMI ARGUMENTAMI

function sum(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        }
    }
}

sum(2)(4)(6);
// lub
let sum3 = sum(3); // a
let sum3and4 = sum3(4); // b
let sum3and4and7 = sum3and4(7); // cb

// Currying - funkcja pomocnicza
// funkcja ktora standardowa funkcje zamieni na wersje z currying

function multiples(a, b) {
    return a * b;
}

// tworzenie wersji currying dla multiples
// funkcja ta moze pracowac z dowolna funkcja ktora przyjmuje dwa argumenty
function curry(fn) {
    return function (a) {
        return function (b) {
            return fn(a,b);
        }
    }
}

let curiedMultiply = curry(multiples);
curiedMultiply(3)(5);

// KOMPOZYCJA
// łączenie dwoch lub wiecej funkcji w celu stworzenia nowej funkcji

function doubleValue(v) {
    return v * 2;
}

function add10ToValue(v) {
    return v + 10;
}

doubleValue(add10ToValue(4));

// funkcja pomocnicza - komponujaca
function compose(fn1, fn2) {
    return function (v) {
        return fn1(fn2(v));
    }
}


// kompozycja + pipe
function split(string) {
    return string.split(' ');
}

function length(arr) {
    return arr.length;
}

function compose(fn2, fn1) {
    return function (v) {
        return fn2(fn1(v));
    }
}

let splitAndGetLength = compose(length, split);

length(split('kompozycja funkcji w javascript')); // 4
splitAndGetLength('kompozycja funkcji w javascript'); // 4

// pipe
// przekazywanie argumentow zgodznie z kolejnoscia wykonywania
function pipe(fn1, fn2) {
    return function (v) {
        return fn2(fn1(v));
    }
}

// utility - compose
// modul npm compose-function

let compose = require('compose-function');
let splitAndGetLength = compose(length, split);
splitAndGetLength('komponowanie nowych funkcji');

// MUTOWALNOSC - zmiennosc
// zmiana stanu obiektu znajdujacego sie poza funkcja - UNIKAMY

let g = 1;
g = 3; // nowe przypisanie
g.id = 4; // krzak, TYPY PODSTAWOWE SA NIEMUTOWALNE

const f = [1,2,3];
f[2] = 5; // mutowanie stalej tablicy
f[3] = 7; // mutowanie stalej tablicy

const obj = {
    id : 1
};

obj.id = 5; // mutowanie obiektu

// obiekt zamrozony, nie mozna edytowac jego wlasciwosci
const obj1  = Object.freeze({
    id : 2
});

// mutowalnosc - przyklady
let numbers = [1,2,3];

function addValue(arr, v) { // funkcja mutowalna
    return arr.push(v);
}

function reverse(arr) { // funkcja mutowalna
    return arr.reverse();
}

function slice(arr, a, b) { // funkcja niemutowalna
    return arr.slice(a,b); // slice zwroci nowa tablice z wartosciami z indeksow od a do b
}

addValue(numbers, 4); // mutowanie tablicy numbers

// przykladowe podejscie do mutowalnosci
let numbers = [1,2,3];

function reverseArr(arr) {
    let newArr = [...arr]; // uzycie zmiennej lokalnej aby uniknac mutowalnosci
    return newArr.reverse();
}

let reversed = reverseArr(numbers);

// drugi sposob, z operatorem spread
let numbers = [1,2,3];

function reverseArr(arr) {
    return arr.reverse();
}

let reversed = reverseArr([...numbers]); // operator spread automatycznie stworzy kopie tablicy numbers

// mutowalnosc obiektow
const user = {
    name : 'admin'
};

function changeName(user, name) {
    return Object.assign({}, user, {name: name}); // zwrocenie kopii obiektu user
    return user.name = name;
}

changeName(user, 'userX');

// LISTY
let values = [1,2,3,4,5];

function double(v) {
    return v * 2;
}

// podejscie imperatywne
// mutowanie - efekt uboczny

for (let i = 0; i < values.length; i++) values[i] = double(values[i]);

// poprawka, unikniecie mutowalnosci w podejsciu imperatywnym
function transformValues(arr, fn) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) newArr[i] = fn(arr[i]);
    return newArr;
}

// podejscie DEKLARATYWNE
// mapowanie tablicy
// mapowanie POWINNO ZWRACAC NOWE WARTOSCI

let newValues = arr.map(double);

// filtrowanie deklaratywne
let numbers = [10,4,7,14,19,3,2,9,34,23];
let filteredNumbers = numbers.filter(value => value % 2 !== 0);
console.log(filteredNumbers);

// redukcja deklaratywna
// "reduktor"
let numbers = [10,4,7,14,19,3,2,9,34,23];
let letters = ['r', 'e', 'd', 'u', 'c', 'e', 'd'];

let reducedList = numbers.reduce((a,b) => a + b, 0);
let reducedLetters = letters.reduce((a,b) => a + b); // reduced

// komponowanie i mapowanie - fuzja

let compose = require('compose-function');

let words = ['funkcyjne', 'javascript', 'redukcja', 'mapowanie', 'kompozycja'];

function trim(str) {
    return str.trim();
}

function upper(str) {
    return str.toUpperCase();
}

// podwojne mapowanie wlasnymi funkcjami
let transformedList = words.map(trim).map(upper);

// kompozycja przy pomocy compose-function
let composedMapper = compose(upper, trim);

// rozne struktury danych - mapowanie na obiektach
let user = {
    name : 'admin',
    email : 'admin@strefakursow.pl'
};

function convertToUCase(v) {
    return v.toUpperCase();
}

// implementacja funkcji mapujacej dzialajaca na obiekcie
function mapObject(fn, obj) {
    let tempObj = {}; // unikniecie mutowania
    let objKeys = Object.keys(obj);

    for (let key of objKeys) {
        tempObj[key] = fn(obj[key]);
    }
    return tempObj; // zwrocenie nowego przetworzonego obiektu
}

let result = mapObject(convertToUCase, user);
console.log(result);

// BIBLIOTEKI POMOCNE W PROGRAMOWANIU FUNKCYJNYM
// Ramda, lodash/fp, immutable-js, mori

// Ramda - przykład
// npm install ramda

const R = require('ramda');

let numbers = [10,4,7,14,19,3,2,9,34,23];

function greeting(name) {
    return 'Witaj ' + name;
}

// przykladowa kompozycja za pomoca ramda
let greet = R.compose(R.toUpper, greeting);
greet('Adam');

// kolejna przykladowa kompozycja za pomoca ramda
// without - usuwa podane wartosci z zestawu
R.without([3,9,13], numbers);

// sum - sumowanie wartosci
R.sum(numbers);
*/
// Lodash - przyklad

const fp = require('lodash/fp');

let numbers = [10,4,7,14,19,3,2,9,34,23];

function isOdd(v) {
    return v % 2 === 1;
}

function double(v) {
    return v * 2;
}

// kompozycja przy pomocy lodash
let newNumbers = fp.compose(fp.map(double), fp.filter(isOdd));

