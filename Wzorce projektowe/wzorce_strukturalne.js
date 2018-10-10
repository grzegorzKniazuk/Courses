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
// adapter
var Product = /** @class */ (function () {
    function Product(sku, price) {
        this.sku = sku;
        this.price = price;
    }
    Product.prototype.getSku = function () {
        return this.sku;
    };
    Product.prototype.getPrice = function () {
        return this.price;
    };
    return Product;
}());
var ProductAdapter = /** @class */ (function () {
    function ProductAdapter(product) {
        this.product = product;
    }
    ProductAdapter.prototype.displaySku = function () {
        return this.product.getSku();
    };
    ProductAdapter.prototype.displayPrice = function () {
        return this.product.getPrice();
    };
    return ProductAdapter;
}());
// bridge - most
var AppComponent = /** @class */ (function () {
    function AppComponent(platform) {
        this.platform = platform;
    }
    AppComponent.prototype.getName = function () { };
    return AppComponent;
}());
var VideoPlayer = /** @class */ (function (_super) {
    __extends(VideoPlayer, _super);
    function VideoPlayer(platform) {
        var _this = _super.call(this, platform) || this;
        _this.platform = platform;
        return _this;
    }
    VideoPlayer.prototype.getName = function () {
        return 'Komponent VideoPlayer';
    };
    return VideoPlayer;
}(AppComponent));
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(platform) {
        var _this = _super.call(this, platform) || this;
        _this.platform = platform;
        return _this;
    }
    Card.prototype.getName = function () {
        return 'Komponent Card';
    };
    return Card;
}(AppComponent));
var IOS = /** @class */ (function () {
    function IOS() {
    }
    IOS.prototype.getPlatform = function () { };
    return IOS;
}());
var Android = /** @class */ (function () {
    function Android() {
    }
    Android.prototype.getPlatform = function () { };
    return Android;
}());
var Folder = /** @class */ (function () {
    function Folder() {
        this.files = [];
    }
    Folder.prototype.getContent = function () { };
    Folder.prototype.addFile = function (file) {
        this.files.push(file);
    };
    return Folder;
}());
var File = /** @class */ (function () {
    function File() {
    }
    File.prototype.getContent = function () { };
    return File;
}());
var BasicWindow = /** @class */ (function () {
    function BasicWindow() {
    }
    BasicWindow.prototype.renderWindow = function () { };
    return BasicWindow;
}());
// interfejs dekoratora okien
var WindowDecorator = /** @class */ (function () {
    function WindowDecorator(window) {
        this.window = window;
    }
    WindowDecorator.prototype.renderWindow = function () { };
    return WindowDecorator;
}());
// dekorator paska przewijania
var ScrollbarDecorator = /** @class */ (function (_super) {
    __extends(ScrollbarDecorator, _super);
    function ScrollbarDecorator(window) {
        return _super.call(this, window) || this;
    }
    return ScrollbarDecorator;
}(WindowDecorator));
// fasada
var Product = /** @class */ (function () {
    function Product() {
    }
    Product.prototype.getProduct = function () { };
    return Product;
}());
var Payment = /** @class */ (function () {
    function Payment() {
    }
    Payment.prototype.makePayment = function () { };
    return Payment;
}());
var Customer = /** @class */ (function () {
    function Customer() {
    }
    Customer.prototype.getCustomerData = function () { };
    return Customer;
}());
// fasada zamowienia
var Order = /** @class */ (function () {
    function Order(product, payment, customer) {
        this.product = product;
        this.payment = payment;
        this.customer = customer;
    }
    Order.prototype.prepareOrder = function () {
        this.product.getProduct();
        this.payment.makePayment();
        this.customer.getCustomerData();
    };
    return Order;
}());
var order = new Order(new Product(), new Payment(), new Customer()).prepareOrder();
// flyweight - pyłek
var Shape = /** @class */ (function () {
    function Shape(name, color) {
        this.name = name;
    }
    return Shape;
}());
var BasicShape = /** @class */ (function (_super) {
    __extends(BasicShape, _super);
    function BasicShape(name, color) {
        var _this = _super.call(this, name, color) || this;
        _this.name = name;
        return _this;
    }
    return BasicShape;
}(Shape));
// fabryka pylkow
var BasicShapeFactory = /** @class */ (function () {
    function BasicShapeFactory() {
        this.instances = [];
    }
    BasicShapeFactory.prototype.getBasicShape = function (name, color) {
        if (this.instances.indexOf(name) === -1) {
            this.instances.push(new BasicShape(name, color));
        }
        else {
            return this.instances;
        }
    };
    return BasicShapeFactory;
}());
// proxy
var RealImage = /** @class */ (function () {
    function RealImage(fileName) {
        this.fileName = fileName;
    }
    RealImage.prototype.loadImage = function () { };
    RealImage.prototype.render = function () { };
    return RealImage;
}());
// klasa proxy
var ProxyImage = /** @class */ (function () {
    function ProxyImage(filename) {
        this.filename = filename;
    }
    ProxyImage.prototype.render = function () {
        if (!this.image) {
            this.image = new RealImage(this.filename);
        }
        return this.image;
    };
    return ProxyImage;
}());
var image = new ProxyImage('image2x');
image.render();
