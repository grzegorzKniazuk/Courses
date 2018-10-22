/*
OOP
klasa - schemat obiektow, ktore beda na jej podstawie tworzone
obiekt - instancja, obiekt utworzony na podstawie schematu klasy, posiada wlasne "dane"
wlasciwosci - zmienne przechowywane w utworzonym obiekcie
metody - funkcje dostepne w kazdym utworzonym obiekcie i wykonywane z dostepem do jego wlasciwosci
konstrukor - specjalna metoda obiektu wywolywana podczas jego tworzenia
dziedziczenie - mozliwosc wspoldzielenia funkcjonalnosci przez rozne klasy
encapsulacja/hermetyzacja - mechanizm ukrywania wlasciwosci lub metod przed bezposrednim dostepem
abstrakcja - koncepcja, aby udosepniane metody byly ogolne, pozwalaly wykonac odpowiednia akcje bez wnikania w szczegoly
polimorfizm - mechanizm, ktory umozliwia tworzenie jednolitych klas, mimo innych implemenacji pewnych metod (przeciazanie metod)
this - specjalne slowo kluczowe, ktore jest referencja do obiektu, na ktorym wywolana jest metoda

DZIEDZICZENIE PROTOTYPOWE
*.prototype - obiekt prototypu
mechanizm szukania prototypu szuka "najblizszego" w lancuchu prototypow, jesli nie znajdzie - undefined
Object nie ma juz wlasnego prototypu

*/
// tworzenie wlasnego konstruktora
function Person(name, surname) {
    this.name = name;
    this.surname = surname;
}
new Person('Jan', 'Kowalski');

Person.prototype.sayHello = function () {
    return `Witaj ${this.name} ${this.surname}`;
};

// dziedziczenie wielokrotne
function Shape(sideLength) {
    this._name = ''; // _ - sugerowanie ze to jest wlasciwosc prywatna
    this._sideLength = sideLength;
}

Shape.prototype.getPerimeter = function () {
    return this._sideLength.reduce((prev, val) => {
       return prev + val;
    }, 0);
};

Shape.prototype.getArea = function () {
    return this._sideLength[0] * this._sideLength[1];
};


function Rectangle(sideLength) { // dziedziczenie
    this._name = 'Prostokąt';
    Shape.call(this, sideLength); // call i "pozyczenie konstruktora"
}
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle; // przypisanie konstruktora

function Triangle(sideLength) {
    Shape.call(this, sideLength);
}

Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.constructor = Triangle;

function Square(sideLength) {
    Rectangle.call(this, sideLength);
}
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

new Shape([20, 20, 20, 20]);
new Rectangle([20, 10]);

// metoda .toString
[1,2].toString(); // "1,2"

// hasOwnProperty
// nie wbudowane wlasciosci sa wyliczalne
Shape.hasOwnProperty('toString'); // false

for (const key in person) {
    if (person.hasOwnProperty(key)) { // w przeciwnym wypadku zostana wyswietlone nazwy funkcji z prototypow
        console.log(key);
    }
}

// operator in - sprawdza czy wlasciwosc znajduje sie na obiekcie
if ('age' in person) {} // true/false

// metody call i apply
// dostepne na prototypie funkcji
function sayHello(greetings) {
    console.log(`${greetings}, ${this.firstname} ${this.lastname}`);
}

const person = {
    firstname: "Jan",
    lastName: 'Kowalski'
};

sayHello.call(person, greetings); // person jako kontekst this dla funkcji sayHello, drugi parametr to parametry funkcji

// uzycie call dla foreach i nodelist
let elems = document.querySelectorAll('#list li');

Array.prototype.forEach.call(elems, function (element) { // forEach na nodelist
    element.style.color = 'red';
});

// metoda apply
function sum(a, b, c) {
    console.log(a + b + c);
}

sum.apply(null, [1, 2, 3]); // null bo nie ma potrzeby this, argumenty jako tablica

// metoda bind
// dostepna na prototypie funkcji
let hello = sayHello.bind(person, 'Witaj'); // nie wywoluje funkcji, zwraca nowa funkcje do hello z kontekstem person jako this oraz argumentami

// domkniecia - closures
var firstName = 'Jan';

(function () { // ograniczy zakres - scope
    var firstName = "Anna";

    function sayHello() {
        console.log(firstName); // Anna
    }

    window.hello = sayHello;
})();
hello(); // Anna, FUNKCJE MAJA DOSTEP DO ZMIENNYCH TAM GDZIE ZOSTALY ZDEFINIOWANE A NIE TAM GDZIE SA WYWOLYWANE

// enkapsulacja, prywatnosc w js przy pomocy domkniec, wzorzec modulu
var person2 = (function () {

    var name = "Jan";
    var surname = "Kowalski";

    return {
        getName: function () {
            return `${name} ${surname}`;
        }
    }
})();
person2.getName(); //  Jan Kowalski