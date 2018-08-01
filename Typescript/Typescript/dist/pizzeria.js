"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pizzeria = /** @class */ (function () {
    function Pizzeria(name) {
        this._manager = 'Jan Kowalski'; // wlasciwosc prywatna
        this.pizzasInOrder = []; // wlasciwosc prywatna
        this.maxPizzasInOven = 10; // wlasciwosc prywatna
        this.recipes = []; // wlasciwosc chroniona
        this.id = Pizzeria.id++; // kolejny id z pola static id
        this.name = name;
    }
    Object.defineProperty(Pizzeria.prototype, "menager", {
        // getter - pozwala pobierac i modyfikowac wartosci pol prywatnych
        get: function () {
            return this._manager; // nazwa wlasciowosci musi byc inna niz gettera/settera
        },
        // setter - pozwala pobierac i modyfikowac wartosci pol prywatnych
        set: function (menager) {
            this._manager = menager;
        },
        enumerable: true,
        configurable: true
    });
    Pizzeria.prototype.getPaymentMethod = function (payment) {
        switch (payment.type) { // type guard by switch
            case 'cash': return "Paid in cash in " + payment.currency;
            case 'debitCard': return "Paid with debit card in " + payment.code;
            case 'onlinePayment': return "Paid online with bank account " + payment.bankAccount;
        }
    };
    // typowanie na metodzie
    Pizzeria.prototype.order = function (pizza) {
        this.pizzasInOrder.push(pizza);
    };
    // typowanie na metodzie
    Pizzeria.prototype.isOvenFull = function () {
        return this.pizzasInOrder.length > this.maxPizzasInOven;
    };
    Pizzeria.prototype.changeStatus = function (index, status) {
        this.pizzasInOrder[index].status = status;
    };
    Pizzeria.prototype.changeSize = function (index, size) {
        this.pizzasInOrder[index].size = size;
    };
    Pizzeria.prototype.checkPrice = function (_a) {
        var price = _a.price;
        if (typeof price === "string") {
            console.log('price is string');
        }
        else if (typeof price === 'number') {
            console.log('price is number');
        }
    };
    Pizzeria.id = 0; // wspoldzielone przez wszystkie instancje, pamieta swoja ostatnia wartosc
    return Pizzeria;
}());
exports.Pizzeria = Pizzeria;
