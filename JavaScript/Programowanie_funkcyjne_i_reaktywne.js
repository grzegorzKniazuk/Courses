// lambda - arrow function
const lambda = () => {

};

// destrukturyzacja

const product = {
    id: 1,
    name: 'product',
    price: 100,
    category: 'category',
};

const {id, name, price} = product;

function getName({id, name}) { // w parametrze funkcji
    return name;
}

getName(product);

// spread/rest

function rest(...product) { // rest

}

const product2 = {
    ...product, // spread
};

// funkcje wyzszego rzedu
const addition = (a, b) => a + b;
const multiplication = (a, b) => a * b;

// operacja wyzszego rzedu
const operation = (x, y, fn) => {
    return fn(x, y);
};

operation(4, 6, addition); // 10

// koncepcja niemutowalnych zmiennych
// - typy proste sa z definicji niemutowalne
// - typy zlozone przekazywane przez referencje moga ulegac mutacji


// koncepcja pure functions
// - zalezna tylko od danych wejsciowych
// - nie powodowanie zmian poza zasiegiem funkcji

// operacje na tablicach
const data = [3, 4, 6, 7, 10, 30, 45];
const result = [];

// proceduralna petla for
for (let i = 0; i < data.length; i++) {
    result.push(data[i] * 2);
}

// deklaratywny map (definicja tego co ma sie wydarzyc)
const result2 = data.map(x => x * 2);

// kompozycja i pipe - funkcje przyjmuja tylko jeden parametr
// kompozycja (wykonanie od funkcji wewnetrznej w gore)
const increment = x => x + 1;
const decrement = x => x - 1;
const double = x => x * 2;
const halve = x => x / 2;

const composeTwo = f1 => f2 => args => f1(f2(args));

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const result3 = composeTwo(increment, double, 10);
const result4 = compose(increment, double, 10);

// pipe (wykonanie od funkcji zewnetrznej w dol)
const pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args))); // odwrocona kolejnosc wywolan

// curry
const add = x => y => x + y;
const multiple = x => y => x * y;

multiple(2)(3); // 6

// Rambda ma wbudowane funkcje do kompozycji, pipe i curryingu

// Funktor
// Funktor to MAPOWALNY kontener na wartosci, spelnia wszystkie wlasciwosci tablic

const F = x => ({
    map: fn => F(fn(x)),
    inspect: () => `F(${x})`
});

const result5 = F(50).map(multiple).map(add); // 100

// Funktorem jest każdy typ danych który spełnia dwie zasady:
// - zasada kompozycji, dostarczenie kompozycji jako parametru musi byc tozsame z dostarczeniem wartosci i wywolaniami map
F(add(multiple(5)));
F(5).map(multiple).map(add);

// - dostarczenie danych do funktora musi byc tozsame z funkcja prostej tozsamosci (x => x)
F((data));
F((data).map(x => x));

class F {
    constructor(x) {
        this.x = x;
    }
    map(fn) {
        return new F(fn(x)); // opakowanie aby moc dalej operowac na tym kontenerze
    }
    flatMap() { // zwracanie wartosci
        return fn(x);
    }
}

// kombinatory w programowaniu funkcyjnym sluza do sterowania przeplywem
// kombinator zwracajacy tozszamosc nosi nazwe identity
const I = x => x;

const half = (val) =>
    F(val)
    .map(x => x/2)
    .flatMap(I);

half(12); // 6

// monady
// rozbudowane funktory, pozwalaja wykonywac obliczenia jako sekwencje krokow
// mozemy dzieki nim zarzacac przeplywem danych w bezpieczny - wolny od efektow ubocznych sposob

const { log } = console;

const getUserProp = prop => product[prop] ? Right(product[prop]) : Left(product[prop]);

log(getUserProp('name').toUpperCase()); // wartosc
log(getUserProp('name2').toUpperCase()); // blad

// do obslugi tego typu bledow sluzy monada Either
// sklada sie z dwoch kontenerow Right || Left

const Right = x => ({
    map: f => Right(f(x)),
    flatMap: (f, g) => Right(g(x)),
    inspect: () => `Right(${x})`,
});

const Left = x => ({
    map: f => Left(f(x)),
    flatMap: (f, g) => Left(f(x)),
    inspect: () => `Left(${x})`,
});

const result6 = getUserProp('name').flatMap(() => 'No property', prop => prop.toUpperCase());

// programowanie reaktywne
// koncepcja tworzenia kodu opartego na zdarzeniach z wykorzystaniem programowania funkcyjnego
