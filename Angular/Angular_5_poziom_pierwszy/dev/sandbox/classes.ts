
// okresla jakie metody musi miec klasa ktora go implementuje
interface CanTalk {
    talk() : string;
}

// KLASY OPROCZ OPISU STRUKTURY OBIEKTU OKRESLAJA ROWNIEZ JEGO ZACHOWANIA
// modyfikatory dostepu public, private, protected

export class Person implements CanTalk {
    protected name : string; // private - modyfikator dostepu, brak dostepu na zewnatrz klasy, ale widoczny w dziedziczacych
    age : number;

    constructor(name : string, age : number) {
        this.name = name;
        this.age = age;
    }

    // metoda
    welcome() : string { // typowanie zwrotki
        return `Hello ${this.name}`;
    }

    isAdult() : boolean {
        return this.age >= 18;
    }

    talk() : string {
        return `Implementacja interejsu przez klasę`;
    }
}

// dziedziczenie - relacja pomiedzy klasami
export class Customer extends Person {
    advisor : string;
    constructor(name : string, age : number, advisor : string) {
        super(name, age);
        this.advisor = advisor;
    }

    // przeciazanie metod
    welcome() : string {
       return `Good morning ${this.name}`;
    }
}

let person = new Person('Placek', 35);
let customer = new Customer('Placek', 35, 'Agata');