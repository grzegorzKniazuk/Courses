"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_1 = require("../models/config");
var operators_1 = require("rxjs/operators");
var CustomerService = /** @class */ (function () {
    function CustomerService(config, httpClient) {
        this.config = config;
        this.httpClient = httpClient;
    }
    CustomerService.prototype.getCustomers = function () {
        var _this = this;
        return this.httpClient.get(this.config.apiUrl + "/customers").pipe(operators_1.map(function (customers) {
            return customers.slice(0, _this.config.customerLimit);
        }));
    };
    CustomerService.prototype.addCustomer = function (customer) {
        return this.httpClient.post(this.config.apiUrl + "/customers", customer);
    };
    CustomerService.prototype.deleteCustomer = function (customer) {
        return this.httpClient.delete(this.config.apiUrl + "/customers/" + customer.id);
    };
    CustomerService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(0, core_1.Inject(config_1.CONFIG))
    ], CustomerService);
    return CustomerService;
}());
exports.CustomerService = CustomerService;
