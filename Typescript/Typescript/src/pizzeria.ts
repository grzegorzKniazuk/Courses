import { Orderable } from "./orderable";
import {Pizza, SizeKey, Status, PaymentMethods} from "./pizza.model";

export abstract class Pizzeria implements Orderable{ // nie mozna tworzyc nowych instacji klas abstrakcyjnych
    static id = 0; // wspoldzielone przez wszystkie instancje, pamieta swoja ostatnia wartosc

    public id : number; // TYPOWANIE
    public name : string; // wlasciwosc publiczna

    private _manager : string = 'Jan Kowalski'; // wlasciwosc prywatna
    pizzasInOrder : Pizza[] = []; // wlasciwosc prywatna
    private maxPizzasInOven : number = 10; // wlasciwosc prywatna

    protected recipes :string[] = []; // wlasciwosc chroniona

    constructor(name : string) { // konstruktor
        this.id = Pizzeria.id++; // kolejny id z pola static id
        this.name = name;
    }

    // getter - pozwala pobierac i modyfikowac wartosci pol prywatnych
    get menager() {
        return this._manager; // nazwa wlasciowosci musi byc inna niz gettera/settera
    }

    // setter - pozwala pobierac i modyfikowac wartosci pol prywatnych
    set menager(menager){
        this._manager = menager;
    }

    public getPaymentMethod(payment : PaymentMethods) { // wykorzystanie Discriminated Unions
        switch (payment.type) { // type guard by switch
            case 'cash' : return `Paid in cash in ${payment.currency}`;
            case 'debitCard' : return `Paid with debit card in ${payment.code}`;
            case 'onlinePayment' : return `Paid online with bank account ${payment.bankAccount}`;
        }
    }

    // typowanie na metodzie
    public order(pizza : Pizza) { // metoda publiczna
        this.pizzasInOrder.push(pizza);
    }

    // typowanie na metodzie
    private isOvenFull() { // metoda prywatna, pisanie zwracanego typu jest zbedne - inferencja typow
        return this.pizzasInOrder.length > this.maxPizzasInOven;
    }

    public changeStatus(index : number, status : Status) { // uzycie enuma
        this.pizzasInOrder[index].status = status;
    }

    public changeSize(index : number, size : SizeKey) { // uzycie enuma
        this.pizzasInOrder[index].size = size;
    }

    public checkPrice({ price } : Pizza) {
        if (typeof price === "string") {
            console.log('price is string');
        } else if (typeof price === 'number') {
            console.log('price is number')
        }
    }

    // typowanie na metodzie
    abstract bake() : void // metoda abstrakcyjna, IMPLEMENTACJA W KLASIE DZIEDZICZACEJ
}



