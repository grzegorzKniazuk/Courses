var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// lancuch odpowiedzialnosci
var PaymentProcessor = /** @class */ (function () {
    function PaymentProcessor() {
    }
    PaymentProcessor.prototype.setSuccessor = function (paymentProcessor) {
        this.successor = paymentProcessor;
    };
    return PaymentProcessor;
}());
var PayPal = /** @class */ (function (_super) {
    __extends(PayPal, _super);
    function PayPal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PayPal.prototype.processPayment = function (amount) {
        if (amount >= 0 && amount <= 99) {
            return ' Płatność Paypal';
        }
        else {
            if (this.successor) {
                return this.successor.processPayment();
            }
        }
    };
    return PayPal;
}(PaymentProcessor));
// command - polecenie
var Engine = /** @class */ (function () {
    function Engine() {
    }
    Engine.prototype.turnOn = function () { };
    Engine.prototype.turnOff = function () { };
    return Engine;
}());
var TurnOnEngine = /** @class */ (function () {
    function TurnOnEngine(engine) {
        this.engine = engine;
    }
    TurnOnEngine.prototype.execute = function () {
        this.engine.turnOn();
    };
    return TurnOnEngine;
}());
var TurnOffEngine = /** @class */ (function () {
    function TurnOffEngine(engine) {
        this.engine = engine;
    }
    TurnOffEngine.prototype.execute = function () {
        this.engine.turnOff();
    };
    return TurnOffEngine;
}());
var EngineSwitch = /** @class */ (function () {
    function EngineSwitch() {
    }
    EngineSwitch.prototype.useSwitch = function (command) {
        command.execute();
    };
    return EngineSwitch;
}());
var engine = new Engine();
var engineSwitch = new EngineSwitch();
var turnOn = new TurnOnEngine(engine);
var turnOff = new TurnOffEngine(engine);
engineSwitch.useSwitch(turnOn);
engineSwitch.useSwitch(turnOff);
var Chat = /** @class */ (function () {
    function Chat() {
    }
    Chat.prototype.sendMessage = function (user, message) {
        this.sender = user.getName();
    };
    return Chat;
}());
var User = /** @class */ (function () {
    function User(name, chatMediator) {
        this.name = name;
        this.chatMediator = chatMediator;
    }
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.send = function (message) {
        this.chatMediator.sendMessage(this, message);
    };
    return User;
}());
var mediator = new Chat();
var user1 = new User('user1', mediator);
var user2 = new User('user2', mediator);
user1.send('wiadomosc');
user2.send('wiadomosc2');
// pamiatka - memento
var Calculator = /** @class */ (function () {
    function Calculator(result) {
        this.result = result;
    }
    Calculator.prototype.getResult = function () {
        return this.result;
    };
    return Calculator;
}());
var Calc = /** @class */ (function () {
    function Calc() {
    }
    Calc.prototype.sum = function (a, b) {
        this.result = a + b;
    };
    Calc.prototype.getResult = function () {
        return this.result;
    };
    Calc.prototype.saveResult = function () {
        return new Calculator(this.result);
    };
    Calc.prototype.restoreResult = function (result) {
        this.result = result.getResult();
    };
    return Calc;
}());
var calculator = new Calc();
calculator.sum(4, 6);
var savedResult = calculator.saveResult();
var SmallBrushState = /** @class */ (function () {
    function SmallBrushState() {
    }
    SmallBrushState.prototype.paint = function () { };
    return SmallBrushState;
}());
var MediumBrushState = /** @class */ (function () {
    function MediumBrushState() {
    }
    MediumBrushState.prototype.paint = function () { };
    return MediumBrushState;
}());
var BigBrushState = /** @class */ (function () {
    function BigBrushState() {
    }
    BigBrushState.prototype.paint = function () { };
    return BigBrushState;
}());
var PaintingCanvas = /** @class */ (function () {
    function PaintingCanvas(state) {
        this.state = state;
    }
    PaintingCanvas.prototype.setState = function (state) {
        this.state = state;
    };
    PaintingCanvas.prototype.paintLine = function () {
        this.state.paint();
    };
    return PaintingCanvas;
}());
var canvas = new PaintingCanvas(new SmallBrushState());
canvas.paintLine();
canvas.setState(new BigBrushState());
canvas.paintLine();
canvas.paintLine();
var QuickSort = /** @class */ (function () {
    function QuickSort() {
    }
    QuickSort.prototype.sort = function (list) { };
    return QuickSort;
}());
var BucketSort = /** @class */ (function () {
    function BucketSort() {
    }
    BucketSort.prototype.sort = function (list) { };
    return BucketSort;
}());
var InsertionSort = /** @class */ (function () {
    function InsertionSort() {
    }
    InsertionSort.prototype.sort = function (list) { };
    return InsertionSort;
}());
var SortingComponent = /** @class */ (function () {
    function SortingComponent(sortingStrategy) {
        this.sortingStrategy = sortingStrategy;
    }
    SortingComponent.prototype.sortList = function (list) {
        return this.sortingStrategy.sort(list);
    };
    return SortingComponent;
}());
var list = ['a', 'b', 'c'];
var sortingComponent = new SortingComponent(new QuickSort());
sortingComponent.sortList(list);
// metoda szablonowa - template method
var DatabaseQuery = /** @class */ (function () {
    function DatabaseQuery() {
    }
    DatabaseQuery.prototype.getDataFromDB = function () {
        this.prepareQuery();
        this.sendQuery();
        this.getResult();
    };
    ;
    return DatabaseQuery;
}());
var MysqlQuery = /** @class */ (function (_super) {
    __extends(MysqlQuery, _super);
    function MysqlQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MysqlQuery.prototype.prepareQuery = function () { };
    ;
    MysqlQuery.prototype.sendQuery = function () { };
    ;
    MysqlQuery.prototype.getResult = function () { };
    ;
    MysqlQuery.prototype.getDataFromDB = function () { };
    ;
    return MysqlQuery;
}(DatabaseQuery));
var MongoDBQuery = /** @class */ (function (_super) {
    __extends(MongoDBQuery, _super);
    function MongoDBQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MongoDBQuery.prototype.prepareQuery = function () { };
    ;
    MongoDBQuery.prototype.sendQuery = function () { };
    ;
    MongoDBQuery.prototype.getResult = function () { };
    ;
    MongoDBQuery.prototype.getDataFromDB = function () { };
    ;
    return MongoDBQuery;
}(DatabaseQuery));
var mysqlQuery = new MysqlQuery();
mysqlQuery.getDataFromDB();
var mongodbQuery = new MongoDBQuery();
mongodbQuery.getDataFromDB();
var FoodDepartment = /** @class */ (function () {
    function FoodDepartment() {
    }
    FoodDepartment.prototype.accept = function (salesReport) {
        salesReport.visitFoodDep(this);
    };
    return FoodDepartment;
}());
var FurnitureDepartment = /** @class */ (function () {
    function FurnitureDepartment() {
    }
    FurnitureDepartment.prototype.accept = function (salesReport) {
        salesReport.visitFurnitureDep(this);
    };
    return FurnitureDepartment;
}());
var SalesReportForDepartment = /** @class */ (function () {
    function SalesReportForDepartment() {
    }
    SalesReportForDepartment.prototype.visitFoodDep = function (foodDepartment) { };
    SalesReportForDepartment.prototype.visitFurnitureDep = function (furnitureDepartment) { };
    return SalesReportForDepartment;
}());
var foodDep = new FoodDepartment();
var furnitureDep = new FurnitureDepartment();
var salesReport = new SalesReportForDepartment();
foodDep.accept(salesReport);
furnitureDep.accept(salesReport);
salesReport.visitFoodDep(foodDep);
salesReport.visitFurnitureDep(furnitureDep);
