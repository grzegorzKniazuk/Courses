// selectedIndex
// uzycie selectedIndex do pobrania value z pola select przy zdarzeniu onChange
document.links_form.links.onChange = () => {
    let index = document.links_form.selectedIndex;
    let url = document.links_form.links[index].value;
    window.location.href = url;
};

// funkcja search
// numer pozycji pierwszego wystapienia
document.getElementById('source').innerHTML.search('ania');

// funkcja replace
// zamiana pierwszego dopasowania (domyslnie) - mozna uzyc flag z wyrazen
document.getElementById('source').innerHTML.replace('ania', 'juz nie ania');

// event - obiekt zdarzen
// wlaciwosci
// target, type, altKey, ctrlKey, clientX, clientY,
// metody
// preventDefault() - blokada domyslnego zachowania przegladarki
// stopPropagation() - blokada rozprzestrzeniania sie zdarzen, eventy wedruja "w gore - do rodzicow"

// obiekt Window
window.addEventListener(); // obserwator zdarzen przypiety do window
window.outerHeight; // zewnetrzna wysokosc
window.outerWidth; // zewnetrzna szerokosc
window.open('adres'); // nowa karta przegladarki
window.print(); // drukuj
window.prompt('podaj numer'); // okienko z polem do wpisywnia wartosci
window.confirm('jestes pewien?'); // okno potwierdzenia

// obiekt navigator
navigator.appCodeName; // nazwa kodowa aplikacji
navigator.appVersion; // wersja aplikacji
navigator.platform; // dla jakiej platformy
navigator.cookieEnabled; // czy pliki cookie sa wlaczone
navigator.userAgent; // podstawowe informacji nt przegladarki

// obiekt location
location.href; // adres
location.host; // host
location.pathname; // sciezka
location.protocol;
location.search; // parametry po ?
location.reload(); // przeladuj
location.replace('adres'); // zaladowanie innego dokumentu pod danym adresem

// obiekt history
history.go(-2); // idz do (dwa stany wstecz)
history.back(); // wstecz
history.forward(); // na poczatek
history.length; // liczba stanow

// sortowanie wartosci w tablicy
let numbers = [4, 5, 6, 7, 87, 9];
numbers.sort((a, b) =>  a - b); // sortowanie rosnaco
numbers.sort((a, b) =>  b - a); // sortowanie malejaco

// dynamiczne tworzenie tabeli
function createTable() {
    let table = document.createElement('table');
    let tableBody = document.createElement('tbody');

    for (let i = 0; i < 3; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 4; j++) {
            let cell = document.createElement('td');
            let cellContent = document.createTextNode(`${j} ${i}`);
            cell.appendChild(cellContent);
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }

    table.appendChild(tableBody);
}

// obsluga wyjatkow
try {

} catch (e) {
    throw new Error(e);
} finally { // instrukcje zawsze wykonywane, niezaleznie czy wystapil jakis wyjatek

}

// zadania http
let request = new XMLHttpRequest();
request.open('GET', 'plik.txt', false);
request.send(null);
console.log(request.responseText);
console.log(request.status);
console.log(request.getResponseHeader('Content-Type'));

// zadanie asynchroniczne
request.open('GET', 'plik.txt', true);
request.send(null);
request.onreadystatechange = () => {
    if (request.readyState) {
        console.log(request.responseText);
    }
};

// przetwarzanie xml
request.open('GET', 'plik.xml', false);
request.send(null);
console.log(request.responseXML);

// w js kazda funkcja jest obiektem
function show() {}
show instanceOf Object; // true
typeof show; // Obiekt typu Fuction

// this - znaczenie zmienia sie dynamicznie, w zaleznosci od kontekstu
// prototype - wlasciwosci/metody dodane w prototypie funkcji sa dostepne we wszystkich jej instancjach

// dziedziczenie prototypowe
function A() {}
function B() {}
A.prototype.show = () => {};
B.prototype = new A();
B.prototype.constructor = B;
