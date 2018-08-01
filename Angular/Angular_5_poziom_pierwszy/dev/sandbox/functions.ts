
// typowanie w funkcjach, ? - parametr opcjonalny, = domyslna wartosc
function welcome(name : string, age? : number, genre : string = 'men') : string {
    return name;
}

function welcome2(...names : string[]) : string { // typowanie operatora spread
    return names.join(', ');
}

function welcome3(name : string) : string {
    return name;
}

console.log(welcome('Placek'));
console.log(welcome2('Dominik', 'Grzegorz', 'Marcin'));

console.log(['Dominik', 'Grzegorz', 'Marcin'].map(name => `Welcome ${name}`));