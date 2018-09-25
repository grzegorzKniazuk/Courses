// typy danych
// boolean, null, undefined, number, string, symbol, object
let r1 = 2 + '5'; // 25
let r2 = 2 * 3 * '5'; // 30
let r3 = 2 * 'aaaa'; // NaN
undefined == null // true
undefined === null // false

// for in - po kluczach
// for of - po wartosciach
for (let key in person) {}
for (let value of person) {}

delete person.age; // usuniecie wlasciwosci obiektu

{} === {} // false - obiekty porownywane sa poprzez referencje a nie zawartosc

// tablice sa obiektami - posiadaja wlasciwosci i metody
// metody tablic
[].pop(); // zwraca i usuwa ostatni element
[].shift(); // zwraca i usuwa pierwszy element
[].push(); // dodaje element na koncu tablicy
[].unshift(); // dodaje element na poczatku tablicy
[].splice(); // usuwa/usuwa i dodaje elementy z/na konkretnych indeksach
[].sort((a, b) => { // sortowanie tablicy (domyslnie jako stringi - rosnaco), modyfikuje tablice
    return -1; // a powinno byc przed b
    return 0; // elementy takie same - nie powinny byc przestawiane
    return 1; // b powinno byc przed a
});