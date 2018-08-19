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
