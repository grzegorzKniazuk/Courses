interface LabelledValue {
    label : string
}

function printLabel(labelObj : LabelledValue) : void {
    console.log(labelObj.label);
}

let obj = {
    size : 10,
    label : 'Size 10'
};

printLabel(obj);

// kolejny przyklad
interface SquareConfig {
    color? : string; // ? - parametr opcjonalny
    width? : number; // ? - parametr opcjonalny
    [propName : string] : any // dowolny typ, dowolne wlasciwosci, dowolna ilosc dodatkowych parametrow, dowolna nazwa
}

function createSquare(config : SquareConfig) : {color : string, area : number} { // zwracany obiekt
    return {color : 'white', area : 100};
}

let mySquare = createSquare({color : 'black'});

// interfejs definjacy byt read-only
interface Point {
    readonly x : number;
    readonly y : number;
}

let p1 : Point = {x : 10, y : 20};

// rzutowanie tablicy jako read-only
let b : number[] = [1,2,3,4];
let ro : ReadonlyArray<number> = b;

b[2] = 2; // zadziala
//ro[2] = 2; // krzak

// interfejs posiadajacy funkcje
interface SearchFunc {
    (source : string, subString : string) : boolean; // funkcja z parametrami i zwrotka
}

let mySearch : SearchFunc;
mySearch = function (source : string, subString : string) : boolean {
    return true;
};