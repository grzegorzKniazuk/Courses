/*
class Vehicle {
    constructor(protected name: string) {}
    public getName(): string {
        return this.name;
    }
}

class Car extends Vehicle {
    constructor(name: string) {
        super(name);
    }
}

class Bicycle extends Vehicle {
    constructor(name: string) {
        super(name);
    }
    public getName(): string {
        return this.name;
    }
}


// simple factory - prosta fabryka - usage
class CarFactory {
    public static createCar(name: string) {
        return new Car(name);
    }
}

let skoda = CarFactory.createCar('Skoda');

// factory method - metoda wytworcza
interface VehicleFactory {
    create(name: string);
}

class CarFactory implements VehicleFactory {
    public create(name: string): Car {
        return new Car(name);
    }
}

class BicycleFactory implements VehicleFactory {
    public create(name: string): Bicycle {
        return new Bicycle(name);
    }
}

let carFactory = new CarFactory();
let car = carFactory.create('skoda');

// abstract factory - fabryka abstrakcyjna
abstract class Button {
    abstract getName();
}

class WindowsButton extends Button {
    public getName(): string {
        return 'Przycisk Windows';
    }
}

class LinuxButton extends Button {
    public getName(): string {
        return 'Przycisk Linux';
    }
}

abstract class Menu {
    abstract getName();
}

class WindowsMenu extends Menu {
    public getName(): string {
        return 'Menu Windows';
    }
}

class LinuxMenu extends Menu {
    public getName(): string {
        return 'Menu Linux';
    }
}

// abstract factory - usage
abstract class UIFactory {
    abstract createButton();
    abstract createMenu();
}

class WindowsUIFactory extends UIFactory {
    public createButton(): WindowsButton {
        return new WindowsButton();
    }

    public createMenu(): WindowsMenu {
        return new WindowsMenu();
    }
}

class LinuxUIFactory extends UIFactory {
    public createButton(): LinuxButton {
        return new LinuxButton();
    }

    public createMenu(): LinuxMenu {
        return new LinuxMenu();
    }
}

let os = 'Windows';
let uiFactory = os === 'Windows' ? new WindowsUIFactory() : new LinuxUIFactory();
let button = uiFactory.createButton();
let menu = uiFactory.createMenu();

// builder - budowniczy
class Pizza {
    protected size: string;
    protected tomato: boolean = false;
    protected extraCheese: boolean = false;
    protected bacon: boolean = false;

    constructor(pizzaBuilder: PizzaBuilder) {
        this.size = pizzaBuilder.size;
        this.tomato = pizzaBuilder.tomato;
        this.extraCheese = pizzaBuilder.extraCheese;
        this.bacon = pizzaBuilder.bacon;
    }

    public getName(): string {
        return 'Pizza';
    }
}

// pizza builder
class PizzaBuilder {
    public size: string;
    public tomato: boolean = false;
    public extraCheese: boolean = false;
    public bacon: boolean = false;

    constructor(size) {
        this.size = size;
    }
    public addTomato(): PizzaBuilder {
        this.tomato = true;
        return this;
    }
    public addExtraCheese(): PizzaBuilder {
        this.extraCheese = true;
        return this;
    }
    public addBacon(): PizzaBuilder {
        this.bacon = true;
        return this;
    }
    public buildPizza(): Pizza {
        return new Pizza(this);
    }
}

let newPizza = (new PizzaBuilder('Small')).addTomato().buildPizza();

// prototype - prototyp
class Pizza {
  constructor(protected size: number, protected price: number) {}
  public getSize(): number {
      return this.size;
  }
  public setSize(size): void {
      this.size = size;
  }
  public getPrice(): number {
      return this.price;
  }
  public setPrice(price): void {
      this.price = price;
  }
}

let pizza = new Pizza(30, 16.99);
let clonedPizza = Object.assign({}, pizza);
clonedPizza.setPrice(18.99);

// singleton
class DbConnection {
    private instance;
    private constructor() {}
    public static getInstance(): DbConnection | void {
        if (this.instance) {
            return this.instance = new DbConnection();
        }
    }
}

let db = DbConnection.getInstance();
*/
