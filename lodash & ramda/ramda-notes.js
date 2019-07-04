const R = require('ramda');

const numbers = [1, 2, 3, 4, 5];

const person = {
    id: 1,
    age: 28,
    name: 'Grzegorz',
    surname: 'K',
    isActive: true,
    job: {
        type: 'Progamista',
        salary: 15000,
    }
};

const person2 = {
    id: 2,
    age: 26,
    name: 'Agata',
    surname: 'G',
    isActive: false,
};

const personArray = [person, person2];

// wszystkie funkcje w Ramda sa immutable, nie mutuja danych
// wszystkie funkcje w Ramda pracuja z currying

// domknięcia w JavaScript
// w JS wszystkie zmienne zapisane w bloku otaczającym funkcję są dostepne w tej funkcji wewnętrznej
// domknięciem dostęp funkcji wewnętrznej do zmiennych z bloku ją otaczającego, taka funkcja może mieć zmienne w swoim zasięgu ale ma również dostęp do zmiennych "wyzej"

const addTo = function (passed) {
    const inner = 2;
    return () => {
        return passed + inner;
    }
};

addTo(3)(); // 5

// currying w JavaScript
function addTwo(one) {
    return (two) => {
        return one + two;
    }
}

addTwo(2)(3); // 5

// functional JS with Ramda

// propEq
// true jesli property obiektu spelnia warunek
const idEquals = R.propEq('id');
const isGrzegorz = idEquals(1, person); // true

// both
// true jesli obydwie przekazane funkcje zwracaja prawde
const isLessThanEighteen = (v1) => v1 < 18;
const isMoreThanTen = (v1) => v1 > 10;

const isLessThanEighteenAndMoreThanTen = R.both(isLessThanEighteen, isMoreThanTen);

isLessThanEighteenAndMoreThanTen(12); // true

// either
// true jesli przynajmniej jedna z przekazanych funkcji zwraca prawde
const isLessThanEighteenOrMoreThanTen = R.either(isLessThanEighteen, isMoreThanTen);

isLessThanEighteenOrMoreThanTen(20); // true


// composition in JS with Ramda
// kompozycja to laczenie dwoch lub wiecej funkcji w celu stworzenia nowej funkcji
// ( bazowo - f(g(x)) )

// compose - kompozycja za pomoca Ramda
const toSlug = (input) => R.compose(R.join('-'), R.map(R.toLower), R.split(' '))(input);

const slug = toSlug('This is composition'); // this-is-composition


// getting nested fields with Ramda path
// Ramda posiada metody do pobierania wartosci z zagniezdzonych pol w obiektcie
// uzywajac jej nie musimy sie martwic czy obiekt istnieje i czy ma taka property - nie wystapi blad jak przy dostepie po kropce

// path - pobierz wartosc z property lub undefined
const getJob = R.path(['job', 'type'], person); // Programista

// pathOr
// pobierz wartosc z property lub zwroc domyslna wartosc
const getCompany = R.pathOr('Britenet', ['job', 'company'], person); // Britenet, bo obiekt nie ma tego property


// converge in Ramda
// call several different functions on the same data and then do some other function on the result of all these functions
const validArr = [6, 3, 4, 5, 2];
const invalidArr = [3, 4, 6, 1];

const sortByBiggestFirst = R.sort(R.descend(R.identity));

function isFirstElementBiggest() {
    R.converge(R.equals, [
        R.head,
        R.compose(R.head, sortByBiggestFirst),
    ]);
}

isFirstElementBiggest(validArr); // true
isFirstElementBiggest(invalidArr); // false


// filtering array

