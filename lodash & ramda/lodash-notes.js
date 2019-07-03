const _ = require('lodash');

// Arrays and objects transformations
const numbers = [1, 2, 3, 4, 5];

const person = {
    id: 1,
    age: 28,
    name: 'Grzegorz',
    surname: 'K',
    isActive: true,
};

const person2 = {
    id: 2,
    age: 26,
    name: 'Agata',
    surname: 'G',
    isActive: false,
};

const personArray = [person, person2];

// each
// each zwraca poczatkowa tablice zamiast undefined w natywnym forEach
_.each(numbers, (number, index) => {
    console.log(`${index}: ${number}`);
});

// each mozna uzyc rowniez na obiektach
_.each(person, (value, key) => {
    console.log(`${key}: ${value}`);
});

// map
const mappedArray = _.map(numbers, (number, index) => {
    return number + index;
});
console.log(mappedArray); // [ 1, 3, 5, 7, 9 ]

// map mozna uzyc rowniez na obiektach
const mappedObject = _.map(person, (value, key) => {
    return value + key;
});
console.log(mappedObject); // [ '1id', 'Grzegorzname', 'Ksurname' ]

// map moze rowniez wyciagnac konkretne property z tablicy obiektow
console.log(_.map(personArray, 'id')); // [ 1, 2 ]

// filter
// mozna uzyc rowniez na obiekcie i na tablicy obiektow
const filteredArray = _.filter(numbers, (number) => {
    return number > 3;
});
console.log(filteredArray); // [ 4, 5 ]

// reject
// "odwrotnosc" filter
const rejectedArray = _.filter(numbers, (number) => {
    return number < 3;
});
console.log(rejectedArray); // [ 1, 2 ]

// find
// dziala na tablicach, tablicach obiektow
// jesli nie znajdzie elementu to zwroci undefined
const findInArray = _.find(personArray, (obj) => {
    return obj.name === 'Agata';
});
console.log(findInArray); // [ { name: 'Agata', surname: 'G' } ]

// mozemy skrocic zapis
const personById = _.find(personArray, {id: 1});
console.log(personById); // { id: 1, name: 'Grzegorz', surname: 'K' }

// without
// wykluczanie danych z tablicy
// nie mutuje zrodlowej tablicy
console.log(_.without(numbers, 1, 3)); // [ 2, 4, 5 ]

// remove
// MUTUJE TABLICE ŹRÓDŁOWĄ
_.remove(personArray, (person) => {
    // return person.id === 1;
});
console.log(personArray); // [ { id: 2, name: 'Agata', surname: 'G' } ]

// every
// czy wszystkie elementy w tablicy spelniaja warunek
const everyArray = _.every(numbers, (number) => {
    return number % 2 === 0;
});
console.log(everyArray); // false

// some
// czy przynajmniej jeden z elementow tablicy spelnia warunek
const someArray = _.some(numbers, (number) => {
    return number % 2 === 0;
});
console.log(someArray); // true

// orderBy
// mozemy sortowac po wielu wartosciach jednoczesnie
const sortArray = _.orderBy(personArray, ['id', 'name'], ['asc', 'desc']);
console.log(sortArray); // [ { id: 1, name: 'Grzegorz', surname: 'K' },{ id: 2, name: 'Agata', surname: 'G' } ]

// groupBy
const groupArray = _.groupBy(personArray, 'isActive');
console.log(groupArray);
/*
{ true:
   [ { id: 1, name: 'Grzegorz', surname: 'K', isActive: true } ],
  false:
   [ { id: 2, name: 'Agata', surname: 'G', isActive: false } ] }
 */

// chain
// laczenie wywolan
const chainArray = _.chain(personArray)
    .filter('isActive')
    .map((person) => person.age * 2)
    .value(); // .value() uzywamy na koncu lancucha aby otrzymac wartosc

console.log(chainArray); // [ 56 ]

// pobieranie czesci tablicy
// metody head tail join last initial nie mutuja zrodlowej tablicy

// head - pobiera pierwszy element tablicy
console.log(_.head(numbers)); // 1

// tail - pobiera elementy tablicy BEZ PIERWSZEGO ELEMENTU
console.log(_.tail(numbers)); // [ 2, 3, 4, 5 ]

// join - laczy elementy tablicy do stringa
console.log(_.join(numbers)); // 1,2,3,4,5

// last - pobiera ostatni element
console.log(_.last(numbers)); // 5

// initial - pobiera wszystkie elementy tablicy BEZ OSTATNIEGO ELEMENTU
console.log(_.initial(numbers)); // [ 1, 2, 3, 4 ]
