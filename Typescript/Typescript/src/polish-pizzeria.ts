import { Pizzeria } from "./pizzeria";
import {Pizza} from "./pizza.model"; // importowanie
import { cancelable } from "./cancelable";

// DEKORATOR KLASY
function PizzaCreated(target : Function) {
    console.log('Polish Pizza has been created...');
}

// dekorator modyfikujący konstrukor w klasie
function ClosedAtNight<T extends {new(...args : any[]) : {}}>(constructor : T) {
    return class extends constructor {
        openAtNight = false;
    }
}

// dekorator metody
function enumerable(value : boolean) {
    return function (target : any, propertyKey : string, propertyDescriptor : PropertyDescriptor) {
        propertyDescriptor.enumerable = value; // propertyDescriptor pozwala modyfikowac dany czlon obiektu
    }
}

@ClosedAtNight // aplikowanie dekoratora na klasę
@PizzaCreated // aplikowanie dekoratora na klasę
export class PolishPizzeria extends Pizzeria{
    constructor(name : string, public openAtNight : boolean) { // stworzenie odrazu publicznego pola w konstruktorze
        super(name); // super musi byc pierwsza deklaracja w konstruktorze
    }

    // nadpisanie metody order z klasy Pizzeria
    public order(pizza : Pizza & cancelable) { // intersection type, operator 'i' do skladania typow
        this.pizzasInOrder.push(pizza);
    }

    @enumerable(false) // wywolanie dekoratora metody
    bake() {
        return 'pizza is being baked';
    }
}