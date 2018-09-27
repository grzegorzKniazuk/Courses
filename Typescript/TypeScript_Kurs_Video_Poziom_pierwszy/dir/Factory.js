"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Factory = /** @class */ (function () {
    function Factory() {
        this.container = [];
    }
    Factory.prototype.push = function (newElement) {
        this.container.push(newElement);
        return this.container;
    };
    Factory.prototype.remove = function (element) {
        this.container.splice(this.container.indexOf(element), 1);
    };
    ;
    Factory.prototype.showElements = function () {
        console.log(this.container);
    };
    ;
    Factory.prototype.shift = function () {
        return this.container.shift();
    };
    ;
    return Factory;
}());
exports.Factory = Factory;
