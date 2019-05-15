/*
Polyfill – Skrypt, który emuluje pewne elementy API w starszej przeglądarce
*/

// znmienne var
// możliwość nadpisania deklaracji

var a = 10;
var a = 20;

// zakres zmiennej var jest ograniczony do funkcji
function showOrderValue() {
    var a = 10;
    console.log(a); // 10
}

// deklaracja var jest hoistowana
console.log(a); // undefined
var a = 10;

// let brak możliwości nadpisania deklaracji w ramach bloku
let a = 10;
let a = 20; // Identifier 'a' has already been declared

// zakres zmiennej let jest ograniczony do bloku
function showOrderValue() {
    {
        let a = 10;
        console.log(a); // 10
    }
    console.log(a); // ReferenceError: a is not defined
}

// - deklaracja let nie jest hoistowana
console.log(a); // ReferenceError: a is not defined
let a = 10;

// const - brak możliwości nadpisania wartości
const a = 10;
a = 20; // Assignment to constant variable.

// zakres zmiennej const jest ograniczony do bloku
function showOrderValue() {
    {
        const a = 10;
        console.log(a); // 10
    }
    console.log(a); // ReferenceError: a is not defined
}

// deklaracja const nie jest hoistowana
console.log(a); // ReferenceError: a is not defined
const a = 10;

/*
3 różnice pomiędzy var a let/const:
- możliwości nadpisania deklaracji (var) / brak możliwości nadpisania deklaracji (let, const)
- zasięg deklaracji, funkcja (var), blok (let, const)
- hoisting, tak (var), nie (let, const)
*/

/*
- W template string mogą być wstawione dowolne wyrażenia, funkcje.
- Możliwość tworzenia wieloliniowych stringów bez znaków nowego wiersza.
 */
const price = 10;
let label = `Cena wynosi ${a}złotych`;

// Destructuring
let numbers = [1, 2, 3, 4, 5];

let [a] = numbers; // 1
let [, b, c, d] = numbers; // 2, 3, 4

[a, b] = [b, a];

let person = {
    name: 'Grzegorz',
    age: 28,
    city: 'Lublin',
};

let { name, age, city } = person; // Grzegorz, 28, Lublin

let person = {
    name: 'Grzegorz',
    age: 28,
    city: 'Lublin',
};

let { name: n, age: a, city: c } = person; // n => Grzegorz, a => 28, c => Lublin

let person = {
    name: 'Grzegorz',
    age: 28,
    city: 'Lublin',
};

let { surname, age, city } = person; // undefined, 28, Lublin

let person = {
    name: 'Grzegorz',
    age: 28,
    city: 'Lublin',
};

let { surname = 'Agata', age = 26, city = 'Lublin' } = person; // Agata, 26, Lublin

function getNumbers() {
    return [1, 2, 3, 4, 5];
}

let [a, b, c, d, e] = getNumbers(); // 1 2 3 4 5

function setOptions({ env, db }) {
    return [ env, db ];
}

function getNumbers() {
    return [1, 2, 3, 4, 5];
}

let [a, , , , e] = getNumbers(); // 1 5

function multiply(a, b = 5) {
    return a * b;
}

multiply(3);

function multiply(a, b = add(a, 5)) {
    return a * b;
}

function add(a, b) {
    return a + b;
}

let Product = () => {};
const p = new Product; // Product is not a constructor

let product = {
    id: 293,
    showId: function () {
        return this.id; // 293
    },
};

let product = {
    id: 293,
    showId: () => this.id, // undefined
};

const product = () => { id: 12345 }; // undefined
const product = () => ({ id: 12345 }); // { id: 12345 }

function getValues(...args) { // wartosc ...args jest tablica
    return args.length;
}

function sumValues(a, b, c) {
    return a + b + c;
}

const values = [3, 2, 7];

sumValues(...values); // 3, 2, 7

const values = [3, 2, 7];
const values2 = [...values, 3, 5, 8]; // 3, 2, 7, 3, 5, 8

const m = new Map();

m.set(1, 'React');
m.set(2, 'Angular');

m.size; // wielkosc mapy

m.get(1); // pobranie elementu po kluczu
m.delete(2); // usuwanie po kluczu
m.clear(); // usuwanie wszystkich elementów z kolekcji

const s = new Set();

s.add('React'); // dodawanie wartości
s.has('Angular'); // false

s.size; // wielkosc zestawu

s.delete('React'); // usuwanie po wartości
s.clear(); // usuwanie wszystkich elementów z zestawu

const arr = [ 10, 20, 30];

for (const key in arr) {
    console.log(arr[key]); // 10 20 30
}

for (const value of arr) {
    console.log(value); // 10 20 30
}

function createIterator(array) {
    let nextIndex = 0;

    return {
        next: function () {
            return nextIndex < array.length
                ? { value: array[nextIndex], done: false }
                : { done: true }
        }
    };
}

let users = createIterator([ 'Grzegorz', 'Agata' ]);

console.log(users.next().value); // Grzegorz
console.log(users.next().value); // Agata

function *a() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}

console.log(a().next().value); // 1
console.log(a().next().value); // 2
console.log(a().next().value); // 3
console.log(a().next().value); // 4
console.log(a().next().value); // 5
console.log(a().next().done); // true – czy iteracja zakończona

function *cities() {
    yield 'Warszawa';
    yield 'Wrocław';
    yield 'Poznań';
}

const places = cities();

for (const city of places) {
    console.log(city);
}

const m = new WeakMap();

let key1 = { id: 1 };
let key2 = { id: 2 };

m.set(key1, 'React');
m.set(key2, 'Angular');

key1 = null;

m.get(key1); // undefined, garbage collector usunął również wartość pod tym kluczem

const s = new WeakSet();

s.add({ value: 'React' }); // dodawanie wartości
s.has({ value: 'Angular' }); // false


s.delete({ value: 'Angular' }); // usuwanie po wartości
s.clear(); // usuwanie wszystkich elementów z zestawu


class Article {
    constructor(title) {
        this._title = title;
    }

    set title(title) {
        this._title = title;
    }

    get title() {
        return this._title;
    }

    static compare(title1, title2) {
        return title1 === title2;
    }
}

class BlogArticle extends Article {
    constructor(category, title) {
        super(title);
        this._category = category;
    }
}

const article = new Article('Tytuł artykułu1');
const blog = new BlogArticle('Blog', 'Tytuł artykułu2');

Article.compare(art1, art2); // wywolanie metody statycznej

class ArrayWithId extends Array {
    constructor(id) {
        super();
        this._id = id;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
}

let a = new ArrayWithId().id = 2;

let s1 = Symbol('opis');
let s2 = Symbol('opis');

console.log(s1 === s2); // false

fetch('image.png')
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log('error');
    })
    .finally(() => {
        console.log('fetch completed');
    });

fetch('image.png') // lancuch then
    .then((data) => {
        return data.blob();
    })
    .then((blob) => {
        const imageURL = URL.createObjectURL(blob);
    });

const obj = {
    id: null,
};

const handler = {
    get: function(obj, key) { // nadpisanie gettera
        return obj[key] * 2;
    }
};

const p = new Proxy(obj, handler);

p.id = 345;

const obj = {
    id: 0,
};

Reflect.deleteProperty(obj, 'id'); // usuniecie property

Reflect.defineProperty(obj, 'id', { // utworzenie property
    enumerable: true,
    configurable: true,
    get() {
        return this.value * 2;
    },
    set(v) {
        this.value = v;
    }
});
obj.id = 4;
console.log(obj.id); // 8

const typedArray8 = new Uint8Array([ 1, 2, 3, 4, 5]);
const typedArray16 = new Uint16Array([ 1, 2, 3, 4, 5]);
const typedArray32 = new Uint32Array([ 1, 2, 3, 4, 5]);
