// typy danych

// --------------------------------
// boolean
let isDone : boolean = true;

// --------------------------------
// number
let decimal : number = 6;
let hex : number = 0xf00d;
let binary : number = 0b1010;
let octal : number = 0o744;
let fixed : number = 1.5;

let sum = binary + octal + fixed;

//string
let color : string = 'blue';
let fullName : string = 'Grzegorz';
let age = '27';

// --------------------------------
// szablony stringow
let sentence : string = `Cześć, nazywam się ${fullName}

Za rok będę miał ${age}.`;

// --------------------------------
// typ tablicowy

// sposob 1
let list : number[] = [1,2,3];

// sposob 2
let list2 : Array<number> = [1,2,3];

// --------------------------------
// mechanizm TUPLE - mechanizm krotek
let x : [string, number] = ['tylko i wylacznie string', 1];

// --------------------------------
// typ wyliczeniowy

enum Color { Red, Green, Blue} // mozna rowniez wplynac na indeksy np Green = 2

let e : Color = Color.Red;
e = 1; // Red
e = Color.Green;

let colorName : string = Color[1];
console.log(colorName); // Green

// --------------------------------
// rozszerzenie typu enum
enum Color {
    Yellow = 3, // pierwszy element rozszerzony musi miec inicjalizowany indeks
    Black
}

// --------------------------------
// typy specjalne

let notSure : any = 5; // do any moze byc przypisany dowolny typ wartosci
notSure = 'string';
notSure = false;

function warnUser() : void { // typ void - brak zwracanej wartosci

}

let u : undefined = undefined; // tylko undefined
let n : null = null; // tylko null

// unitypy - tutaj number lub null lub undefined
let a : number | null | undefined = 2;

// typ never - uzywany przy wyjatkach
// z tej funkcji nie ma powrotu
function error(message : string) : never { // oznacza ze ta funkcja nigdy nic nie zwroci
    throw new Error(message);
}

let someValue : any = 'this is a string';

// mechanizm TYPE ASSERATIONS
let stringLength : number = (<string>someValue).length;