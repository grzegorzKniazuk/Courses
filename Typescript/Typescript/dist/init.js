"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var polish_pizzeria_1 = require("./polish-pizzeria");
var american_pizzeria_1 = require("./american-pizzeria");
var pizza_model_1 = require("./pizza.model");
var laStrada = new polish_pizzeria_1.PolishPizzeria('laStrada', true);
var americanHouse = new american_pizzeria_1.AmericanPizzeria('americanHouse', false);
var venezia = new polish_pizzeria_1.PolishPizzeria('Venezia', false);
var capriciosa = {
    name: 'capriciosa',
    price: '20.99zł',
    size: 'large',
    status: pizza_model_1.Status.Ordered,
    cancelable: true
};
venezia.order(capriciosa);
americanHouse.order(capriciosa);
venezia.changeStatus(0, pizza_model_1.Status.Baked);
venezia.changeSize(0, 'small');
