/*
// temporal dead zone

let firstName = 'Jan';

if (true) {
    let lastName = 'Kowalski';
}

console.log(typeof lastName); // undefined a nie NotDefinedError, mimo ze mamy let w bloku kodu, <- temporal dead zone

// literaly obiektowe
let name = 'Jan';
let surname = 'Kowalski';
let fnName = 'function_name';

let person = {
    name, // <=> name: name
    surname, // <=> surname: surname
    getName() {}, // concise method, syntatic sugar
    [fnName]() {} // wartosc zmiennej jako nazwa metody
};

// nowe metody dla Object
function Person(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
}

Person.prototype.sayHello = function () {
  return `${this.firstname} ${this.lastname}`;
};
// inny prototyp dla pojedynczego obieku
let methods = {
    sayHello() {}
};
let person = new Person('Grzegorz', 'Kniazuk');
let person2 = new Person('Grzegorz', 'Kniazuk');
Object.setPrototypeOf(person, methods); // ustalenie prototypu wylacznie dla obiektu person

// Object.assign()
// typy proste sa kopiowane, do typow zlozonych tworzona jest referencja
config = {
    speed: 300,
};

function slider(config) {
    let defaults = {
        speed: 500,
        pause: 300,
        easing: 'linear',
    };
    const options = Object.assign({}, defaults, config); // options = { speed: 300, pause: 300, easing: 'linear' }
}

// Object.is() - porownanie dwoch wartosci
Object.is(22, 22); // true
Object.is({}, {}); // false
Object.is(NaN, NaN); // false
Object.is(+0, -0); // true

// arrow functions
// nie posiadaja zmiennej arguments w ciele
let args  = function(a, b) {
    console.log(arguments);
};
args(1,2); // { '0': 1, '1': 2 }

let args2 = (a, b) => {
    console.log(arguments);
};
args2(1,2); // arguments is not defined

// domyslne wartosci w parametrach
function muliply(a = 2, b = a * 2,  c = getC()) {}

// lazy evaulation dla domyslnych argumentow
// jesli parametr zostanie podany uzyj go, jesli nie, pobierz wartosc z funkcji
function getCountryCode(countryInfo = getCountryCode("Polska")) {
    return `Państwo to ${countryInfo.country}, a jego kod to ${countryInfo.code}`
}

// nazwa funkcji
function getName() {}
getName.name; // "getName"

// operator REST
function calculate(type, ...args) { // ...args bedzie tablica argumentow podanych po "type"
    return args.reduce((prev, next) => prev + next);
}
calculate("sum", 2, 22, 3, 7, 18);

// operator SPREAD
// dziala na tablicach, stringach i na wszystkim co ma Iterator
let numbers = [12, 3, 9, 22, 11, 6];
let numbers2 = [2, 33, 10, ...numbers, 1, 75];
Math.max(...numbers);
let letters = [..."Grzegorz"]; // ['G', 'r', 'z', 'e', 'g', 'o', 'r', 'z'];

// destructuring
// dekompozycja obiektow
let person = {
    firstName: 'Jan',
    lastName: 'Kowalski',
    age: 49,
};
let b, c, d;
let { firstName, lastName, age } = person;
let { firstName: fName, lastName: lName, age: a } = person; // dekompozycja do innych nazw zmiennych
({firstName: b, lastName: c, age: d} = person); // dekompozycja do wczesniej utworzonych zmiennych
console.log(firstName, lastName, age); // Jan Kowalski 49

// dekompozycja tablic
let numbers = [10, 20, 30, 40, 50];
let [one, two, three, , five] = numbers; // puste przecinki, pomijanie wartosci

// value swapping - zamiana wartosci
let a = 1, b = 2;
[a, b] = [b, a];

// dekompozycja zagniezdzonych struktur
let person = {
    firstName: 'Jan',
    lastName: 'Kowalski',
    age: 49,
    job: {
        name: 'Programista',
        experience: 20,
    },
    favNumbers: {
        list: [2, 7, 3],
    }
};
let { firstName, age } = person || {};
let { job: { name }} = person || {}; // Programista
let { favNumbers: { list: [ , second ]}} = person || {}; // 7

// Domyślne wartości i operator rest
let numbers = [10, 20, 30, 40, 50];
let [first, second, ...rest] = numbers || []; // rest => [30, 40, 50]

let number = [10];
let [one, two = 2] = number || []; // wartosc domyslna

let person = {
    firstName: 'Jan',
    lastName: 'Kowalski',
    age: 49,
    job: "Księgowy",
};
let { firstname, lastname, job = 'programista'} = person || {}; // domyslna wartosc dla job

// Dekompozycja parametrów funkcji
function setSliderSpeed({ speed, easing } = {}) { // z domyslnym pustym obiektem
    let slider = {};
    slider.speed = speed;
    slider.easing = easing;
}
const config = {
    autoPlay: true,
    speed: 500,
    pause: 2000,
    easing: 'linear',
    infinite: true,
};
setSliderSpeed(config);

// Template strings
// tag functions - Funkcje tagujące
function formatPrice(strings, ...values) {
    console.log(strings); // [ dekompozycja stringa tak jak przy pomocy split ]
    console.log(values); // wartosci interpolowane
    let output = '';
    strings.forEach((string, index) => {
        output += string + values[index];
    })
}

let product = {
    name: "Płyta DVD",
    price: 1,
};
let { name, price } = product || {};
let info = formatPrice`Dodałeś do koszyka produkt ${name} w cenie ${price}`; // tagowanie za pomoca funkcji

// nowe metody dla string
const url = 'http//mojastrona.pl';
url.startsWith('h'); // true
url.endsWith('s'); // false
url.includes('moja'); // true
url.repeat(2); // powtorzenie 2x stringu

// klasy
// klasy nie sa hoistowane
// klasy nie sa wlasciwosciami obiektu Window
// tworzenie klas
class Person {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
    sayHello() {
        return `Witaj, ${this.firstname} ${this.lastname}`;
    }
}

// dziedziczenie
class Human {}
class Person extends Human {}

// dziedziczenie z wbudowanych typow
class Collection extends Array {}
let col = new Collection(10, 20, 30); // [10, 20, 30]

// Symbole
// typ prymitywny
// jakas wartosc, niewiemy jaka ale unikalna
// w pewnym stopniu emuluje prywatny modyfikator dostepu
// well-known symbols - symbole wbudowane w js

const hidden = Symbol('secret'); // string pozwala na debugowanie

let person = {
    [hidden]: '123444424',
};
console.log(person[hidden]); // secret

const FORMAT = Symbol('format()');

class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    sayHello() {
        return `${this.firstName} ${this.lastName}`;
    }
    [FORMAT](text) { // symulacja metody prywatnej
        return text.toUpperCase();
    }
}

// metody symboli
// const hidden = new Symbol('hidden');
const hidden = Symbol.for('hidden'); // dziala jak wyzej ale sprawia ze symbol jest przechowywany w "globalnym rejestrze"

let person = {
    [hidden]: 'hidden-password',
    getSecret() {
        return this[hidden];
    }
};
console.log(Symbol.keyFor(hidden)); // hidden

// symbole wbudowane
Symbol.hasInstance;
Symbol.toPrimitive;
Symbol.toStringTag;
Symbol.isConcatSpreadable;
Symbol.species;
Symbol.match;
Symbol.replace;
Symbol.search;
Symbol.split;
Symbol.unscopables;
Symbol.iterator;

// Iteratory
let it = {
    [Symbol.iterator]() {
        let numbers = [1,2,3,4,5];
        let index = 0;

        return {
            next: function () {
                return {
                    done: index === numbers.length,
                    value: numbers[index++],
                }
            }
        }
    }
};
// for-of
// iterowanie po obiektach zawierajacych iterator, np po nodeList elementow html
for (let value of it) {
    console.log(value);
}

// Generatory, funkcje ktore zwracaja Iteratory
// funkcje generatorow sa pauzowane pomiedzy wywolaniami next, pauzowane sa od yield do kolejnego yield
function *it() {
    for (let i = 1; i <= 50; i++) { // jedno i++ to jedno wywolanie next()
        yield i;
    }
}

let iterator = it();
iterator.next();

// dodanie iteratora do wlasnego obiektu
let it = {
    *[Symbol.iterator]() { // iterator bedacy funkcja generatora, posiada next()

    }
};

function *range(from, to) {
    let i = from;
    while (i <= to) {
        yield i++;
    }
}
for (let value of range(2,14)) {
    console.log(value); // 1 2 3 4 5 6 7 8 9 10 11 12 13 14
}

// przekazywanie wartosci do generatorow
function *it(number) {
    yield result = yield + number * 2;
}
let iterator = it(5);
iterator.next(); // 10
iterator.next(2); // 12

// Promises
let p = new Promise( ((resolve, reject) => {
    // wywolanie resolve dla ok
    // wywolanie reject dla bledu
}));
p.then(
    () => {
        // funkcja dla resolve
    },
    () => {
        // funcja dla reject
    }
);

// łączenie łancuchowe
let p = new Promise( ((resolve, reject) => {}));
p.then( () => {

}).catch( () => { // catch obsluguje funkcje dla reject

});

// statyczne metody Promises
Promise.resolve(); // zwraca Promise w stanie resolve
Promise.reject(); // zwraca Promise w stanie reject

// praca na wielu Promises
Promise.all(new Promise(), new Promise()).then( () => {
    // then wywola sie w momencie gdy wszystkie Promise z argumentow beda mialy status resolve
});
Promise.race(new Promise(), new Promise()).then( () => {
    // then wywola sie w momencie gdy jakikolwiek Promise z argumentow otrzyma status resolve lub reject
});

// Set
// ma w sobie iterator
// dane w Set musza byc/beda unikalne
let person1 = { name: 'Grzegorz', surname: 'Kniazuk' };
let person2 = { name: 'Agata', surname: 'Glen' };

let s = new Set(); // metody add set length clear
s.add('text'); // ['text']
s.delete('text');
s.has('text'); // true
s.clear(); // []

let p = new Set(person1, person2);
p.delete(person2);

// WeakSet
// nie posiada iteratora
// do WeakSet nie mozna dodawac wartosci prymitywnych
let person1 = { name: 'Grzegorz', surname: 'Kniazuk' };
let person2 = { name: 'Agata', surname: 'Glen' };

let ws = new WeakSet(person1, person2); // metody add delete has
ws.has(person2); // true

// Map
// zawiera unikalne pary klucz - wartosc
// posiada iterator
let m = new Map(); // metody set get clear has delete length
m.set('name', 'Grzegorz');
m.get('name'); // Grzegorz

let person1 = { name: 'Grzegorz', surname: 'Kniazuk' };
let person2 = { name: 'Agata', surname: 'Glen' };

let persons = new Map();
persons.add(person1, '32'); // obiekt jako klucz
persons.get(person1); // 32

// WeakMap
// nie zawiera iteratora
let person1 = { name: 'Grzegorz', surname: 'Kniazuk' };
let person2 = { name: 'Agata', surname: 'Glen' };
let w = new WeakMap([person1, 27, person2, 25]);  // metody set get has delete

// gettery i settery
class Person {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
    get firstlName() {
        return this.firstname;
    }
    set firstName(firstname) {
        this.firstname = firstname;
    }
}

// obiekt Proxy API, wspolpracuje z Reflect API
let person = { name: 'Grzegorz', surname: 'Kniazuk' };
let proxy = new Proxy(person, {
   get(target, property, receiver) {
       return Reflect.get(target, property, receiver);
   }
});

// moduły
// moduly nie tworza globalnych zmiennych, kazdy z nich ma swoja przestrzen nazw
import Employee from './Employee.js'
*/
// nowosci w tablicach
