"use strict";
// typy danych
// --------------------------------
// boolean
var isDone = true;
// --------------------------------
// number
var decimal = 6;
var hex = 0xf00d;
var binary = 10;
var octal = 484;
var fixed = 1.5;
var sum = binary + octal + fixed;
//string
var color = 'blue';
var fullName = 'Grzegorz';
var age = '27';
// --------------------------------
// szablony stringow
var sentence = "Cze\u015B\u0107, nazywam si\u0119 " + fullName + "\n\nZa rok b\u0119d\u0119 mia\u0142 " + age + ".";
// --------------------------------
// typ tablicowy
// sposob 1
var list = [1, 2, 3];
// sposob 2
var list2 = [1, 2, 3];
// --------------------------------
// mechanizm TUPLE - mechanizm krotek
var x = ['tylko i wylacznie string', 1];
// --------------------------------
// typ wyliczeniowy
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {})); // mozna rowniez wplynac na indeksy np Green = 2
var e = Color.Red;
e = 1; // Red
e = Color.Green;
var colorName = Color[1];
console.log(colorName); // Green
// --------------------------------
// rozszerzenie typu enum
(function (Color) {
    Color[Color["Yellow"] = 3] = "Yellow";
    Color[Color["Black"] = 4] = "Black";
})(Color || (Color = {}));
// --------------------------------
// typy specjalne
var notSure = 5; // do any moze byc przypisany dowolny typ wartosci
notSure = 'string';
notSure = false;
function warnUser() {
}
var u = undefined; // tylko undefined
var n = null; // tylko null
// unitypy - tutaj number lub null lub undefined
var a = 2;
// typ never - uzywany przy wyjatkach
// z tej funkcji nie ma powrotu
function error(message) {
    throw new Error(message);
}
var someValue = 'this is a string';
// mechanizm TYPE ASSERATIONS
var stringLength = someValue.length;
