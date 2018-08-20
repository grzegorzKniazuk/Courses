// adapter
class Product {
    constructor(protected sku: number, protected price: number) {}
    public getSku(): number {
        return this.sku;
    }
    public getPrice(): number {
        return this.price;
    }
}
class ProductAdapter {
    constructor(protected product: Product) {}
    public displaySku(): number {
        return this.product.getSku();
    }
    public displayPrice(): number {
        return this.product.getPrice();
    }
}

// bridge - most
abstract class AppComponent {
    constructor(public platform) {}
    public getName() {}
}

class VideoPlayer extends AppComponent {
    constructor(public platform) {
        super(platform);
    }
    getName() {
        return 'Komponent VideoPlayer';
    }
}

class Card extends AppComponent {
    constructor(public platform) {
        super(platform);
    }
    getName() {
        return 'Komponent Card';
    }
}

interface Platform {
    getPlatform();
}

class IOS implements Platform {
    getPlatform() {}
}

class Android implements Platform {
    getPlatform() {}
}

// composite - kompozyt
interface FileSystem {
    getContent();
}

class Folder implements FileSystem {
    protected files = [];
    getContent() {}
    addFile(file: File) {
        this.files.push(file);
    }
}

class File implements FileSystem {
    getContent() {}
}

// dekorator
interface window {
    renderWindow();
}

class BasicWindow implements window {
    renderWindow() {}
}

// interfejs dekoratora okien
class WindowDecorator {
    constructor(protected window: window) {}
    renderWindow() {}
}
// dekorator paska przewijania
class ScrollbarDecorator extends WindowDecorator {
    protected window: window;
    constructor(window: window) {
        super(window);
    }
}

// fasada
class Product {
    getProduct() {}
}

class Payment {
    makePayment() {}
}

class Customer {
    getCustomerData() {}
}
// fasada zamowienia
class Order {
    constructor(protected product: Product,
                protected payment: Payment,
                protected customer: Customer) {}
    prepareOrder() {
        this.product.getProduct();
        this.payment.makePayment();
        this.customer.getCustomerData();
    }
}
let order = new Order(new Product(), new Payment(), new Customer()).prepareOrder();

// flyweight - pyłek
class Shape {
    constructor(public name: string, color: string) {}
}

class BasicShape extends Shape {
    constructor(public name: string, color: string) {
        super(name, color);
    }
}
// fabryka pylkow
class BasicShapeFactory {
    private instances = [];
    getBasicShape(name: string, color: string) {
        if (this.instances.indexOf(name) === -1) {
            this.instances.push(new BasicShape(name, color));
        } else {
            return this.instances;
        }
    }
}

// proxy
class RealImage {
    constructor(private fileName: string) {}
    loadImage() {}
    render() {}
}
// klasa proxy
class ProxyImage {
    private image;
    constructor(private filename: string) {}
    render() {
        if (!this.image) {
            this.image = new RealImage(this.filename);
        }
        return this.image;
    }
}
let image = new ProxyImage('image2x');
image.render();
