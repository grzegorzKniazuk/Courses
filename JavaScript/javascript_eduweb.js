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
// przykladowe metody tablic
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

function f() {}; // podlega hoistingowi
var f = function () {}; // nie podlega hoistingowi

// garbage collector - 'odsmieciarz' - mechanizm w js ktory sam usuwa z pamieci ram niepotrzebne dane
// zmienna arguments - obiekt tablico-podobny przechowujacy argumenty przekazane do funkcji
eval(); // przyjmuje tekst ktory jest kodem
isNaN(); // czy jest liczba
isFinite(); // czy jest liczba skonczona
parseInt(); parseFloat(); // parsowanie na int/float

// obiekt string
var n = 'ania';
var n1 = new String('ania');

n.length; // 4, dlatego ze js w locie przerzuci ta wartosc prymitywna przez konstruktor String'a

// obiekt number
var n = 3;
n.toString(16); // konwersja na system 16
n.toFixed(2); // dwa miejsca po przecinku

// obiekt array
var arr = [10]; // [10]
var arr = new Array(10); // [10x undefined]

// obiekt function - funkcje w js sa obiektami
var f = new Function('arg1', 'arg2', 'return arg1 + arg2'); // funkcja posiada nawet swoj konstruktor
f.length; // ilosc argumentow w funkcji

// obiekt math
Math.round(); // zaokroaglanie .0-.5 - w dol, .6+ w gore
Math.ceil(); // zaokroglanie zawsze w gore
Math.floor(); // zaokraglanie zawsze w dol

// obiekt date
var d = new Date();

// obiekt regexp
let r = /a+/gi;

// obsluga wyjatkow
try {

} catch (e) {

} finally {

}

throw new Error('error msg');

// obiekt window - glowny obiekt przegladarki
// obiekt navigator (window.navigator)

navigator.userAgent;
navigator.getGamepads(); // etc

// obiekt screen (window.screen)
screen.lockOrientation(); // etc

// obiekt location (window.location) - odwolanie do adresu w przegladarce
location.host; // etc

let timeout = setTimeout(() => { // opoznienie

});
clearTimeout(timeout);

let interval = setInterval(() => { // opoznienie + zapetlenie

});
clearInterval(interval);

// przeszukiwanie dom
document.getElementsByName('name'); // zwraca array-like z elementami
document.querySelector('#id'); // zwraca zawsze pierwszy napotkany
document.querySelectorAll('.class'); // zwraca zawsze wszystkie wystapienia

document.all; // wszystkie elementy na stronie
document.forms; // wszystkie formularze
document.images; // wszystkie grafiki
document.links; // wszystkie linki

// tworzenie elementow
let div = document.createElement('div'); // nowy element div - NIGDZIE nie podpiety-wyswietlony
let li = document.createElement('li');
let text = document.createTextNode('tresc'); // nowy wezel tekstowy

// wstawianie i usuwanie elementow ze strony
div.appendChild(text);
div.insertBefore(text); // wstawianie 'przed' element
div.removeChild(text); // usuwanie 'dziecka' elementu
div.replaceChild(text, text); // zamiana elementow

// tworzenie fragmentow dokumentow
let documentFragment = document.createDocumentFragment(); // przydatne przy dodawaniu elementow w petli, dodajemy napierw do fragmentu a na koniec w dom
div.appendChild(documentFragment);

// relacje miedzy elementami
div.childNodes(); // lista wezlow - dzieci
div.children(); // wszystkie dzieci ktore sa ELEMENTAMI
div.firstChild(); // pierwsze dziecko
div.lastChild(); // ostatnie dziecko
div.firstElementChild(); // pierwszy element
div.lastElementChild(); // ostatni element
div.nextSibling(); // nastepny sasiad
div.nextElementSibling(); // nastepny ELEMENT sasiad
div.parentNode; // odwolanie do rodzica