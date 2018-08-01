"use strict";
// czym jest typ never?
// typ never reprezentuje wartosci ktore nigdy nie wystapia
var showError = function (msg) { throw new Error(msg); }; // zwrot jest typu never
// lub petle while ktore nigdy sie nie koncza - zwraca never
var showErrors = function () {
    while (true) {
        console.log('Error');
    }
};
