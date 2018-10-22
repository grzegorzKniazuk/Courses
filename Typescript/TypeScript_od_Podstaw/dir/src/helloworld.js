"use strict";
var whoIAmValue = 'world';
function sayHello(toWhom) {
    console.log('Hello ' + toWhom);
}
// typ VOID - nie zwracam nic
// typ ANY - mogę zwrócić cokolwiek
function whoIAm(whoIAmValue) {
    return whoIAmValue;
}
sayHello('Grzegorz');
