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