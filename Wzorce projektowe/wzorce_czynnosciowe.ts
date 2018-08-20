// lancuch odpowiedzialnosci
abstract class PaymentProcessor {
    protected successor;
    setSuccessor(paymentProcessor) {
        this.successor = paymentProcessor;
    }
    abstract processPayment(amount);
}

class PayPal extends PaymentProcessor {
    processPayment(amount) {
        if (amount >= 0 && amount <= 99) {
            return ' Płatność Paypal';
        } else {
            if (this.successor) {
                return this.successor.processPayment();
            }
        }
    }
}

// command - polecenie
class Engine {
    turnOn() {}
    turnOff() {}
}

interface Command {
    execute();
}

class TurnOnEngine implements Command {
    constructor(private engine: Engine) {}
    execute() {
        this.engine.turnOn();
    }
}

class TurnOffEngine implements Command {
    constructor(private engine: Engine) {}
    execute() {
        this.engine.turnOff();
    }
}

class EngineSwitch {
    useSwitch(command: Command) {
        command.execute();
    }
}

let engine = new Engine();
let engineSwitch = new EngineSwitch();
let turnOn = new TurnOnEngine(engine);
let turnOff = new TurnOffEngine(engine);
engineSwitch.useSwitch(turnOn);
engineSwitch.useSwitch(turnOff);

// iterator
// brak przykladu ze wzgledu na brak interfejsu Iterator w ts

// mediator
interface ChatMediator {
    sendMessage(user, message);
}
class Chat implements ChatMediator {
    public sender: string;
    sendMessage(user: User, message: string) {
        this.sender = user.getName();
    }
}
class User {
    constructor(private name, private chatMediator: ChatMediator) {}
    getName() {
        return this.name;
    }
    send(message) {
        this.chatMediator.sendMessage(this, message);
    }
}
let mediator = new Chat();
let user1 = new User('user1', mediator);
let user2 = new User('user2', mediator);
user1.send('wiadomosc');
user2.send('wiadomosc2');

// pamiatka - memento
class Calculator {
    constructor(protected result: number) {}
    getResult() {
        return this.result;
    }
}
class Calc {
    protected result: number;
    sum(a: number, b: number) {
        this.result = a + b;
    }
    getResult() {
        return this.result;
    }
    saveResult() {
        return new Calculator(this.result);
    }
    restoreResult(result: Calculator) {
        this.result = result.getResult();
    }
}
let calculator = new Calc();
calculator.sum(4,6);
let savedResult = calculator.saveResult();

// obserwator - observer

// stan - state
interface BrushState {
    paint();
}
class SmallBrushState implements BrushState {
    paint() {}
}
class MediumBrushState implements BrushState {
    paint() {}
}
class BigBrushState implements BrushState {
    paint() {}
}
class PaintingCanvas {
    constructor(protected state: BrushState) {}
    setState(state: BrushState) {
        this.state = state;
    }
    paintLine() {
        this.state.paint();
    }
}
let canvas = new PaintingCanvas(new SmallBrushState());
canvas.paintLine();
canvas.setState(new BigBrushState());
canvas.paintLine();
canvas.paintLine();

// strategia - strategy
interface SortStrategy {
    sort(list: string[]);
}
class QuickSort implements SortStrategy {
    sort(list) {}
}
class BucketSort implements SortStrategy {
    sort(list) {}
}
class InsertionSort implements SortStrategy {
    sort(list) {}
}
class SortingComponent {
    constructor(protected sortingStrategy: SortStrategy) {}
    sortList(list: string[]) {
        return this.sortingStrategy.sort(list);
    }
}
let list = ['a', 'b', 'c'];
let sortingComponent = new SortingComponent(new QuickSort());
sortingComponent.sortList(list);

// metoda szablonowa - template method
abstract class DatabaseQuery {
    abstract prepareQuery();
    abstract sendQuery();
    abstract getResult();
    getDataFromDB() {
        this.prepareQuery();
        this.sendQuery();
        this.getResult();
    };
}

class MysqlQuery extends DatabaseQuery {
    prepareQuery() {};
    sendQuery() {};
    getResult() {};
    getDataFromDB() {};
}

class MongoDBQuery extends DatabaseQuery {
    prepareQuery() {};
    sendQuery() {};
    getResult() {};
    getDataFromDB() {};
}
let mysqlQuery = new MysqlQuery();
mysqlQuery.getDataFromDB();
let mongodbQuery = new MongoDBQuery();
mongodbQuery.getDataFromDB();

// odwiedzajacy - visitor
interface Department {
    accept(salesReport: SalesReport);
}
class FoodDepartment implements Department {
    accept(salesReport: SalesReport) {
        salesReport.visitFoodDep(this);
    }
}
class FurnitureDepartment implements Department {
    accept(salesReport: SalesReport) {
        salesReport.visitFurnitureDep(this);
    }
}
interface SalesReport {
    visitFoodDep(foodDepartment: FoodDepartment);
    visitFurnitureDep(furnitureDepartment: FurnitureDepartment);
}
class SalesReportForDepartment implements SalesReport {
    visitFoodDep(foodDepartment: FoodDepartment) {}
    visitFurnitureDep(furnitureDepartment: FurnitureDepartment) {}
}
let foodDep = new FoodDepartment();
let furnitureDep = new FurnitureDepartment();
let salesReport = new SalesReportForDepartment();
foodDep.accept(salesReport);
furnitureDep.accept(salesReport);
salesReport.visitFoodDep(foodDep);
salesReport.visitFurnitureDep(furnitureDep);
