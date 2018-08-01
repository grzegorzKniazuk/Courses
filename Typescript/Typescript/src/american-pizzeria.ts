import { Pizzeria } from "./pizzeria"; // importowanie

export class AmericanPizzeria extends Pizzeria{
    constructor(name : string, public openAtNight : boolean) {
        super(name);
    }
    bake() {
        return 'pizza is being baked... please wait';
    }
}