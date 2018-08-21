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
*/
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
