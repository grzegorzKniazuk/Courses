"use strict";
function printLabel(labelObj) {
    console.log(labelObj.label);
}
var obj = {
    size: 10,
    label: 'Size 10'
};
printLabel(obj);
function createSquare(config) {
    return { color: 'white', area: 100 };
}
var mySquare = createSquare({ color: 'black' });
var p1 = { x: 10, y: 20 };
// rzutowanie tablicy jako read-only
var b = [1, 2, 3, 4];
var ro = b;
b[2] = 2; // zadziala
var mySearch;
mySearch = function (source, subString) {
    return true;
};
