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

// strings
// - toLower/toUpper - zmiana wielkosci liter
_.toUpper('grzegorz'); // GRZEGORZ
_.toLower('GRZEGORZ'); // grzegorz

// join
_.join(['Grze', 'gorz'], ''); // Grzegorz

// split
_.split('Grzegorz', 'e'); // ['Grz','gorz']

// snake-case
_.snakeCase('Grze gorz'); // Grze_gorz

// camel-case
_.camelCase('Grze gorz'); // GrzeGorz

// capitalize
_.capitalize('grzegorz'); // Grzegorz

// zaawansowane funkcje
// random
// losowa liczba z zakresu
_.random(0, 100, true); // 0-100 float
_.random(0, 100, false); // 0-100 int

// uniqueId
// unikatowy numer | string np: user_1 user_2 etc
_.uniqueId(); // 1
_.uniqueId(); // 2
_.uniqueId(); // 3

// flatten
// "splaszczenie" tablic
const numbersArrayNested = [[1, 2, 3,], [3, 4, 5]];

_.flatten(numbersArrayNested); // [ 1, 2, 3, 3, 4, 5 ]

// compact
// usuwa falsy values z tablicy
const arr = [1, 2, null, 3, undefined, 0, false, ''];

_.compact(arr); // [1,2,3];

// assign
// laczenie, w porównaniu do natywnego Object.assign() assign lodash'a działa na wszystkich przeglądarkach
const state = {
    isLoading: true,
    data: null,
    error: null,
};

const newState = {
    isLoading: false,
    data: { id: 1, name: 'Grzegorz' },
};

_.merge({}, state, newState);
/*
{
    isLoading: false,
    data: { id: 1, name: 'Grzegorz' },
    error: null
}
*/

// clone, cloneDeep
// klonowanie
const baseConfig = {
    apiUrl: 'http://someapi.com',
    port: 4000,
};

const cloned = _.clone(baseConfig);
const deepCloned = _.cloneDeep(baseConfig);

// testowanie wartosci/typow
_.isEqual(1, 1); // true

// isEqual dziala rowniez z obiektami
_.isEqual({ id: 1 }, { id: 1 }); // true

// isEmpty
// sprawdza czy wartosc to pusty obiekt lub pusta tablica - DLA WARTOSCI PRYMITYWNYCH ZAWSZE ZWRÓCI TRUE
_.isEmpty([]); // true
_.isEmpty({}); // true

// isNil
// czy null | undefined
_.isNil(1); // false

// debounce
// opoznienie wywolania, "liczy" czas od ostatniego wywolania
// czyli jesli bedziemy w tym przypadku pisac caly czas i szybko to funkcja wywola sie dopiero po 500ms od ostatniego keydowna
const onTypingD = (event) => console.log(event.target.value);
document.getElementById('name').addEventListener('keydown', _.debounce(onTyping, 500));

// throttle
// opoznienie wywolania, "liczy" czas niezaleznie od ostatniego wywolania
// czyli funkcja bedzie wywolywac sie co 500ms, niezaleznie ile liter wprowadzimy w tym czasie
const onTypingT = (event) => console.log(event.target.value);
document.getElementById('name').addEventListener('keydown', _.throttle(onTyping, 500));

// mixin
// uzycie wlasnych funkcji w lodash chain
function capitalizeLast(str) {
    const last = _.last(str);
    const initial = _.chain(str).initial().join('').value();

    return initial + _.capitalize(last);
}

_.mixin({ capitalizeLast: capitalizeLast });

_.chain('grzegorz')
    .capitalizeLast()
    .value();
