// klasy implementujaca interfejs
import {IWorker} from "./interfaceIWorker";
import {JobPosition} from "./enumJobPosition";
import {Skill} from "./Skill";

class Worker implements IWorker{
    constructor(private id : number,
                public firstName : string, // przy podaniu wlasciwosci parametrycznych nie musimy definiowac wlasciwosci
                public lastName : string,
                public yearOfGranulation : number,
                public languages : string[],
                public hasDriverLicence : boolean,
                public position : JobPosition,
                public skills : Array<Skill>) { // tablica elementow implementujacych klase Skill
    };

    static legalNote = 'Some legal information'; // pole statyczne, dostepne tylko bezposrednio w klasach

    public getFullName() {
        return this.firstName + ' ' + this.lastName;
    };
    get idNumber() : number { // getter
        return this.id;
    }
    set idNumber(id : number) { // setter
        this.id = id;
    }
}

export { Worker };