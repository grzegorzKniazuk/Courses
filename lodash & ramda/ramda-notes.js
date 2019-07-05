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

const products = [
    {
        name: 'Jacket',
        price: 50,
        category: 'clothes',
    },
    {
        name: 'Boots',
        price: 120,
        category: 'clothes',
    },
    {
        name: 'Iphone',
        price: 600,
        category: 'electronics',
        count: 5
    },
    {
        name: 'Ipad',
        price: 300,
        category: 'electronics',
        count: 10,
    }
];

const video = {
    '720p': 'funny-video-hd.mp4',
    '480p': 'funny-video-480p.mp4',
    isHD: true,
};

const students = [
    { name: 'Alex', score: 84 },
    { name: 'Jack', score: 65 },
    { name: 'John', score: 46 },
];

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
// __ - placeholder gdy nie potrzebujemy podawac argumentu do funkcji - np do lt
function getProductNames() {
    return R.compose(
        R.pluck('name'),
        R.filter(R.where({
            category: R.equals('clothes'),
            count: R.lt(R.__,50),
            price: R.lt(R.__,50),
        })),
    );
}

getProductNames()(products); // [ 'Jacket', 'Boots' ]

// conditions
function getVideoFilePath() {
    return R.compose(
        R.concat('/api/videos/'),
        R.ifElse(
            R.propEq('isHD', true), // pierwszy argument to funkcja ktora zwraca true | false
            R.prop('720p'), // wykonanie przy true
            R.prop('480p') // wykoanie przy false
        )
    );
}

getVideoFilePath()(video); // /api/videos/funny-video-hd.mp4


// when method
R.when(
    () => true, // funkcja zwracajaca true or false
    () => {}, // funkcja na true
)();

// unless method
R.unless(
    () => false, // funkcja zwracajaca true or false
    () => {}, // funkcja na false
);

// changing object fields with ramda lenses
// lens w Ramda służą jako Proxy przy pracy z literałami obiektów

const nameLensBase = R.lens(R.prop('name'), R.assoc('name'));
const nameLens = R.lensProp('name'); // sugar na zapis wyzej

R.view(nameLens, person); // getter -  Grzegorz
const GrzechuPerson = R.set(nameLens, 'Grzechu', person); // setter


R.over(nameLens, R.toUpper, person);

// Manipulating with arrays and objects
// Praca z obiektami i tablicami w Ramda

// useWidth - na przykladzie reducera
const state = [ 1, 2, 3 ];
const action = {
    payload: 1,
};

function reducer(state, action) {
    return R.useWith(
        R.flip(R.append), // flip - odwraca kolejnosc argumentow
        [
            R.init,
            R.prop('payload')
        ]
    );
}

const newState = reducer(state, action);

// cutting array in Ramda
R.head(numbers); // pierwszy element tablicy
R.last(numbers); // ostatni element tablicy
R.init(numbers); // zwraca wszystkie elementy tablicy oprocz ostatniego
R.tail(numbers); // zwraca wszystkie elementy tablicy oprocz pierwszego
R.take(2, numbers); // pobierze 2 pierwsze elementy z tablicy liczac od poczatku
R.takeLast(2, numbers); // pobierze 2 pierwsze elementy z tablicy liczac od konca
R.drop(2, numbers); // usunie 2 pierwsze elementy z tablicy liczac od konca
R.dropLast(2, numbers); // usunie 2 pierwsze elementy z tablicy liczac od konca

// grouping in Ramda
const groupByScore = R.groupBy(R.prop('isActive'));

groupByScore(personArray);

// Sorting in Ramda
R.sort(R.ascend(R.identity), numbers);
R.sort(R.descend(R.identity), numbers);

R.sort(R.ascend(R.prop('name')), personArray);
R.sortBy(R.prop('name'))(personArray);

R.sortWith([ // wiele warunkow
    R.descend(R.prop('age')),
    R.ascend(R.prop('name')),
])(personArray);

// Predicates in Ramda
const isActiveAll = R.all(R.propEq('isActive', true), personArray); // czy wszystkie elementy spelniaja warunek
const isActiveAny = R.any(R.propEq('isActive', true), personArray); // czy ktorykolwiek element spelnia warunek
const isActiveNone = R.none(R.propEq('isActive', true), personArray); // czy wszystkie elementy nie spelniaja warunku
const isActiveAdmin = R.allPass([ // wiele warunkow
    R.propEq('isActive', true),
    R.propEq('role', 'admin'),
]);
