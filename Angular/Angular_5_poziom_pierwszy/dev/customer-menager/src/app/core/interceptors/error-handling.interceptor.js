"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
// globalna obsluga bledow
var ErrorHandlingInterceptor = /** @class */ (function () {
    function ErrorHandlingInterceptor(messageService) {
        this.messageService = messageService;
    }
    ;
    ErrorHandlingInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return next.handle(req).pipe(operators_1.catchError(function (error) {
            if (error instanceof http_1.HttpErrorResponse) {
                _this.messageService.error('Błąd połączenia ze serwerem.');
            }
            return rxjs_1.throwError(error);
        }));
    };
    ErrorHandlingInterceptor = __decorate([
        core_1.Injectable()
    ], ErrorHandlingInterceptor);
    return ErrorHandlingInterceptor;
}());
exports.ErrorHandlingInterceptor = ErrorHandlingInterceptor;
