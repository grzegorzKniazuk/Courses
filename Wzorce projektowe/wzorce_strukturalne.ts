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
