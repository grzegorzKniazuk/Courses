export class CarsService {
    cars : Car[] = [
        {
            model : 'Mazda',
            year : 1998,
            power: 244
        },
        {
            model : 'Mercedes',
            year : 2004,
            power : 138
        }
    ];
    isServiceFull : boolean = true;

    constructor() {
        this.getCarsNames(this.cars);
        this.checkServiceStatus();
    }

    getCarsNames(cars : Car[]) : string[]{
        let prefix : string = 'CS';

        return cars.map((car : Car) => prefix + car.model);
    }

    checkServiceStatus() : void {
        if (this.isServiceFull) {
            console.log('Service is full, no more place for new cars.');
        } else {
            console.log('We still have a place for a new car.');
        }
    }
}

// interfejs - typ dla obiektu
interface Car {
    model : string;
    year : number;
    power : number;
}

