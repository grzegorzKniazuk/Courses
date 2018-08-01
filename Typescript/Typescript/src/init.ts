import { PolishPizzeria } from "./polish-pizzeria";
import { AmericanPizzeria } from "./american-pizzeria";
import {Size, Status} from "./pizza.model";

const laStrada = new PolishPizzeria('laStrada', true);
const americanHouse = new AmericanPizzeria('americanHouse', false);
const venezia = new PolishPizzeria('Venezia', false);

const capriciosa = {
    name : 'capriciosa',
    price : '20.99zł',
    size : <Size>'large', // rzutowanie na typ Size
    status : Status.Ordered,
    cancelable : true
};

venezia.order(capriciosa);
americanHouse.order(capriciosa);

venezia.changeStatus(0, Status.Baked);

venezia.changeSize(0, 'small');


