// co dodaje ts?
// typowanie
// interfejsy
// klasy abstrakcyjne
// enums
// pola i metody prywatne
// dekoratory

// instalacja node i typescript
// npm install -g typescript
// tsc Kurs_TypeScript.ts - kompilowanie do js

// stworzenie tsconfig.json - inicjalizacja projektu ts
// tsc --init <- tworzy plik konfiguracyjny
//
// przykladowe wlasciwosci
// 'target' - do jakiej wersji js ma sie kompilowac ts
// 'strict' - czy wlaczyc tryb scisly js, uruchania mechanizm typowania
// 'include' - tablica - lista plikow ktore maja byc kompilowane do js
// 'exclude' - tablica - lista plikow ktore NIE maja byc kompilowane do js
// 'outDir' - katalog wynikowy dla kompilowanych plikow
/*
console.log('hello world');

// Tworzenie klasy w TypeScript

class Pizzeria {
    public name;
    constructor(name) {
        this.name = name;
    }
}

const laStrada = new Pizzeria('LaStrada');

// modyfikatory dostępu
// public, private, protected, readonly
// public - widoczne poza klasa
// private - pole lub metoda sa niewidoczne poza klasa
// protected - pole lub metoda sa niewidoczne poza klasa, ale klasa pochodna ma dostep
// readonly - pole wylacznie do odczytu, modyfikator niedostepny dla metod

class Pizzeria {
    static id = 0; // wspoldzielone przez wszystkie instancje, pamieta swoja ostatnia wartosc

    public id;
    public name; // wlasciwosc publiczna

    private _manager = 'Jan Kowalski'; // wlasciwosc prywatna
    private pizzasInOrder = []; // wlasciwosc prywatna
    private maxPizzasInOven = 10; // wlasciwosc prywatna

    protected recipes = []; // wlasciwosc chroniona

    constructor(name) { // konstruktor
        this.id = Pizzeria.id++; // kolejny id z pola static id
        this.name = name;
    }

    get menager() { // getter - pozwala pobierac i modyfikowac wartosci pol prywatnych
        return this._manager; // nazwa wlasciowosci musi byc inna niz gettera/settera
    }

    set menager(menager) { // setter - pozwala pobierac i modyfikowac wartosci pol prywatnych
        this._manager = menager;
    }

    public order(pizza) { // metoda publiczna
        this.pizzasInOrder.push(pizza);
    }

    private isOvenFull() { // metoda prywatna
        return this.pizzasInOrder.length > this.maxPizzasInOven;
    }
}

const laStrada = new Pizzeria('laStrada');
const americanHouse = new Pizzeria('americanHouse');
const Venezia = new Pizzeria('Venezia');

laStrada.order('Havanian Pizza');

// uzywanie setterow i getterow
console.log(laStrada.menager); // Jan Kowalski
laStrada.menager = 'Jola Kowalska';
console.log(laStrada.menager); // Jola Kowalska

// uzycie pol static
console.log(laStrada); // id 0
console.log(americanHouse); // id 1
console.log(Venezia); // id 2

// klasy abstrakcyjne
abstract class Pizzeria { // nie mozna tworzyc nowych instacji klas abstrakcyjnych
    static id = 0; // wspoldzielone przez wszystkie instancje, pamieta swoja ostatnia wartosc

    public id;
    public name; // wlasciwosc publiczna

    private _manager = 'Jan Kowalski'; // wlasciwosc prywatna
    private pizzasInOrder = []; // wlasciwosc prywatna
    private maxPizzasInOven = 10; // wlasciwosc prywatna

    protected recipes = []; // wlasciwosc chroniona

    constructor(name) { // konstruktor
        this.id = Pizzeria.id++; // kolejny id z pola static id
        this.name = name;
    }

    get menager() { // getter - pozwala pobierac i modyfikowac wartosci pol prywatnych
        return this._manager; // nazwa wlasciowosci musi byc inna niz gettera/settera
    }

    set menager(menager) { // setter - pozwala pobierac i modyfikowac wartosci pol prywatnych
        this._manager = menager;
    }

    public order(pizza) { // metoda publiczna
        this.pizzasInOrder.push(pizza);
    }

    private isOvenFull() { // metoda prywatna
        return this.pizzasInOrder.length > this.maxPizzasInOven;
    }
    abstract bake()// metoda abstrakcyjna, IMPLEMENTACJA W KLASIE DZIEDZICZACEJ
}

class PolishPizzeria extends Pizzeria{
    constructor(name, public openAtNight) { // stworzenie odrazu publicznego pola w konstruktorze
        super(name); // super musi byc pierwsza deklaracja w konstruktorze
    }
    bake() {
        return 'pizza is being baked';
    }
}

class AmericanPizzeria extends Pizzeria{
    constructor(name, public openAtNight) {
        super(name);
    }
    bake() {
        return 'pizza is being baked... please wait';
    }
}

const laStrada = new PolishPizzeria('laStrada', true);
const americanHouse = new AmericanPizzeria('americanHouse', false);
const Venezia = new PolishPizzeria('Venezia', false);

console.log(laStrada, americanHouse, Venezia);

// typowanie strukturalne - TS
class Batman {
    kick(input : number) : number {
        return 5;
    }
}

class Superman {
    kick(input : number) : number {
        return 3;
    }
}

const clarkKent : Batman = new Superman();

import {Orderable} from "./orderable";

export abstract class Pizzeria implements Orderable{ // nie mozna tworzyc nowych instacji klas abstrakcyjnych
    static id = 0; // wspoldzielone przez wszystkie instancje, pamieta swoja ostatnia wartosc

    public id : number; // TYPOWANIE
    public name : string; // wlasciwosc publiczna

    private _manager : string = 'Jan Kowalski'; // wlasciwosc prywatna
    pizzasInOrder : string[] = []; // wlasciwosc prywatna
    private maxPizzasInOven : number = 10; // wlasciwosc prywatna

    protected recipes :string[] = []; // wlasciwosc chroniona

    constructor(name : string) { // konstruktor
        this.id = Pizzeria.id++; // kolejny id z pola static id
        this.name = name;
    }

    // getter - pozwala pobierac i modyfikowac wartosci pol prywatnych
    get menager() {
        return this._manager; // nazwa wlasciowosci musi byc inna niz gettera/settera
    }

    // setter - pozwala pobierac i modyfikowac wartosci pol prywatnych
    set menager(menager){
        this._manager = menager;
    }

    // typowanie na metodzie
    public order(pizza : string) { // metoda publiczna
        this.pizzasInOrder.push(pizza);
    }

    // typowanie na metodzie
    private isOvenFull() { // metoda prywatna, pisanie zwracanego typu jest zbedne - inferencja typow
        return this.pizzasInOrder.length > this.maxPizzasInOven;
    }

    // typowanie na metodzie
    abstract bake() : void // metoda abstrakcyjna, IMPLEMENTACJA W KLASIE DZIEDZICZACEJ
}
*/

// DEKORATORY
// dekoratory sa funkcjami ktore moga modyfikowac:
// klasy, metody, parametry, pola klasy, akcesory
// uruchomienie - 'experimentalDecorators' i 'emitDecoratorMetadata' na true w configu

// TSLINT
// narzedzie do poprawy jakosci kodu
// npm install tslint -g
// tslint --init
// tslint *.ts

// WEBPACK
// npm install -g create-ts-lib
// create-ts-lib my-first-app
