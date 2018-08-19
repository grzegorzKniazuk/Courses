"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var customerType_1 = require("../../../../core/enums/customerType");
var CustomerAddComponent = /** @class */ (function () {
    function CustomerAddComponent(customerService, messageService) {
        this.customerService = customerService;
        this.messageService = messageService;
        this.CustomerType = customerType_1.CustomerType;
    }
    CustomerAddComponent.prototype.ngOnInit = function () {
    };
    CustomerAddComponent.prototype.addCustomer = function (form) {
        var _this = this;
        this.customerService.addCustomer({
            name: this.name,
            age: this.age,
            type: this.type,
            photoUrl: '',
            categories: [],
            description: '',
            address: {
                city: '',
                houseNumber: 0,
                street: '',
            }
        }).subscribe(function () { return form.resetForm(); }, function () { return _this.messageService.error('Błąd zapytania do serwera.'); }); // subscribe wymagany aby wyslac zapytanie post
        this.messageService.success('Dodano nowego klienta!');
    };
    CustomerAddComponent = __decorate([
        core_1.Component({
            selector: 'app-customer-add',
            templateUrl: './customer-add.component.html',
            styleUrls: ['./customer-add.component.css']
        })
    ], CustomerAddComponent);
    return CustomerAddComponent;
}());
exports.CustomerAddComponent = CustomerAddComponent;
