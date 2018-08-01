"use strict";
// dla kolejek
var Queue = /** @class */ (function () {
    function Queue() {
        this.data = [];
    }
    Queue.prototype.push = function (item) {
        this.data.push(item);
    };
    Queue.prototype.pop = function () {
        this.data.shift();
    };
    Queue.prototype.getAll = function () {
        return this.data;
    };
    return Queue;
}());
//const people = new Queue<string>(); // definujemy jaki typ generyczny bedziemy podawac
//people.push('Marek');
//console.log(people);
//const numbers = new Queue<number>(); // definujemy jaki typ generyczny bedziemy podawac
//numbers.push(1);
//console.log(numbers);
var productItems = new Queue(); // definujemy jaki typ generyczny bedziemy podawac
