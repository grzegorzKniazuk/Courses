// enumeracja obiektu
let obj = {
    a : 1,
    b : 3,
    c : 'c',
    f : true
};

// listowanie kluczy obiektu
for (const key in obj) {
    if (obj.hasOwnProperty(key)) { // sprawdzenie czy obiekt posiada dana wlasciwosc
        console.log(obj[key]); // wyprowadzenie kluczy
    }
}

Object.values(obj); // tablica wartosci z obiektu
Object.keys(obj); // tablica kluczy z obiektu
Object.getOwnPropertyNames(obj); // tablica z nazwami wlasciwosci dostepnych w obiekcie

// funkcja w obiekcie - metody
let user = {
    name : 'admin',
    showMsg() { // metoda
        return 'Witaj admin';
    }
};

// wlasciwosci obiektow
// property descriptor
// getOwnPropertyDescriptor - wlasciwosci obiektow
// 4 CECHY WLASCIWOSCI
// value, writable, enumerable, configurable

let obj = {
    a : 1,
    b : 3,
    c : 'c',
    f : true
};

Object.getOwnPropertyDescriptor(obj, 'a');

// modyfikacja wlasciwosci obiektu
// Object.defineProperty

let obj = {
    a : 1,
    b : 3,
    c : 'c',
    f : true
};

Object.defineProperty(obj, 'a', { // moze edytowac wlasciwosci jak i dodawac nowe
    value: 3, // wartosc ?
    writable: true, // zapisywalnosc ?
    enumerable: true, // iteracja ?
    configurable: true // konfiguralnosc ?
});

// duplikowanie / klonowanie
let user = {
    id : 1,
    role : 'author'
};

// kopiowanie obiektu w es6
let newUser = Object.assign({}, user);

// Object.assign nie przenosi cech wlasciwosci obiektow
// cechy: value, configurable, writable, enumerable

// mozliwosci rozszerzania
// ograniczenie mutowalnosci

let user = {
    id : 1,
    role : 'author'
};

// zapobiega rozszerzaniu obiektu o nowe wlasciwosci
// ale nie blokuje modyfikacji i usuwania wlasciwosci
Object.preventExtensions(obj);

// czy obiekt jest rozszerzalny ?
Object.isExtensible(obj);

// SEAL oraz FREEZE
// seal - zapieczetowanie
// freeze - zamrozenie

// seal
// blokuje rozszerzanie i usuwanie wlasciwosci
// pozwala na modyfikacje
Object.seal(obj);

// freeze
// blokuje rozszerzanie, usuwanie i modyfikacje wlasciwosci
Object.freeze(obj);

// metoda hasOwnProperty
// sprawdza czy nasz obiekt posiada wlasciwosc o danej nazwie
let user = {
    id : 1,
    role : 'author'
};

user.hasOwnProperty('name'); // false

// gettery oraz settery
let user = {
    get id() {
        return this._id_;
    },
    set id(id) {
        this._id_ = id;
    }
};

user.id = 5; // set
user.id; // get

// this w javascript
// referencja do obieku na ktorym funkcja zostala wywolana

function fn() {
    return this.id;
}

let obj = {
    id: 5
};

fn.call(obj); // uzycie call, "zapozyczenie" funkcji dla obiektu, wywolanie funkcji fn na rzecz obiektu obj

// PROTOTYPY
// PROTOTYP JEST OBIEKTEM

let obj = {
    x : 1
};

let newObj = Object.create(obj); // stworzenie obiektu na podstawie innego obiektu
newObj.x; // x zostanie znalezione w prototypie obiekltu newObj - obj

// konstruktory

function Point(x,y) {
    this.x = x;
    this.y = y;
}

let point = new Point(2,4);
console.log(point.constructor); // [Function: Point] - wskazanie na konstruktora obiektu
console.log(point.constructor.name); // Point - wskazanie na nazwe konstruktora obiektu

// wlasciwosc PROTOTYPE
// [nazwa obiektu].prototype
function Point(x,y) {
    this.x = x;
    this.y = y;
}

let point = new Point(2,4);
console.log(Point.prototype); // Point {} - pusty obiekt prototypu

Point.prototype.getCordinates = function () { // dodanie metody do obiektu prototypu
    return this.x + ' ' + this.y;
};

console.log(Point.prototype); // Point { getCordinates : [Function] } - pusty obiekt prototypu

point.hasOwnProperty('x'); // czy obiekt point ma wlasciwosc x

// wlasciwosci prototypow

console.log(Object.getPrototypeOf(point)); // wyswietlenie prototypu obiektu
console.log(Object.setPrototypeOf(point, {})); // zmiana prototypu obiektu
console.log(point instanceof Point); // true
console.log(Point.prototype.isPrototypeOf(point)); // true

// DZIEDZICZENIE PROTOTYPOWE

function Point(x,y) {
    this.x = x;
    this.y = y;
}

function Point3d(x, y, z) {
    Point.call(this, x, y);
    this.z = z;
}

Point.prototype.getX = function () {
    return this.x;
};

let point3d = new Point3d(2,3,4);

point3d.getX(); // krzak, brak dostepu

Point3d.prototype = Object.create(Point.prototype); // podlaczenie prototypu Point do Point3d

point3d.getX(); // 2

// DELEGACJA

let Widget = {
    init : function (name) {
        this.name = name;
    },
    showParams : function () {
        return this.name;
    }
};

let Button = Object.create(Widget); // button na podstawie Widget

Button.initButton = function (name, size) { // dodawanie metody
    this.init(name); // DELEGACJA do Widget
    this.size = size;
};

let btn = Object.create(Button);
btn.initButton('cta-button', 'large');
*/
// KOMPOZYCJA
let Widget = {
    init : function (name) {
        this.name = name;
    }
};

let hasLabel = {
    setLabel : function (label) {
        this.label = label;
    }
};

let isClickable = {
    handleClick : function () {
        return 'Click!';
    }
};

let ctaBtn = Object.assign(Object.create(Widget), hasLabel, isClickable);