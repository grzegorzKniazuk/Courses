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
*/
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


