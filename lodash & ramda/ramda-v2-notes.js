const R = require('ramda');

// curried functions
// wszystkie funkcje w Ramda możemy wywoływać jako curry

R.add(2)(3); // 5

function multiply(a, b) {
    return a * b;
}

// currying własnych funkcji
const multiplyCurried = R.curry(multiply);
multiplyCurried(2)(4); // 8

// compose
// kolejność wywołań: prawa => lewa
const addFive = R.add(R.__, 5);

const multiplyToString = R.compose(addFive, multiply);
multiplyToString(2)(3); // 10

// pipe
// kolejność wywołań: lewa => prawa
const addFive = R.add(R.__, 5);

const multiplyToString = R.pipe(multiply, addFive);
multiplyToString(2)(3); // 10

// not point-free
// because I referred to the data object directly and my function in tightly coupled to dat that's passed into it
const data = { coord: { lon: -0.13, lat: 51.51 }, name: 'Lublin', weather: [{ description: 'snow' }] };

const summarySentence = data => `Today in ${data.name} You can expect ${R.head(data.weather).description}`;

// Point-Free
// Compositional style where we decouple or functions from the data they operate on

const transformWeather = {
    weather: R.compose(R.join(' '), R.prop('description')),
}

// w zadnym miejscu nie odwolujemy sie bezposrednio do obiektu z danymi
const summarySentencePointFree = R.compose(
    R.tap(console.log),
    R.map(R.join(' ')),
    R.zip(['Today in'], ['You can except']),
    R.props(['name', 'weather']),
    R.evolve(transformWeather), // evolve takes an object and allows You to evolve all or some of the properties of that object by applying a transformation function
    R.pick(['name', 'wather'])
);

// Immunatability
const numbers = [1, 2, 3, 4];
const reversed = R.reverse(numbers); // natywny reverse mutuje zrodlowa tablice

// Functors
const add3 = add(3);

// funktorem nazywamy "pudełko" na wartość
// funktor musi posiadac "map" do mapowania po wartosciach
[2].map(add3);

// funktor musi posiadac "apply"
const wrappedVal = [2];
const wrappedFn = [add3];

Array.prototype.ap = function (wrappedFn) { // implementacja "wlasnego" apply
    return wrappedFn.map(fn => fn(this[0]));
}

wrappedVal.ap(add3);

// Monads
// posiada metody z funktora "map", "apply"
// posiada metode "of", to "wrzucania" wartości w "pudełko";
// posiada metode "chain" do tworzenia łańcuchów wywołań

Array.prototype.of = function (val) { // implementacja "wlasnego" of
    return new Array(1).fill(val);
}

Array.prototype.chain = function (fn) { // implementacja "wlasnego" chain
    return !this.map(fn)[0] ? this : this.map(fn);
}

[3].chain(add3).chain(add3);