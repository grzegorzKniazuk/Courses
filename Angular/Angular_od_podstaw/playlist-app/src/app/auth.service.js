"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.spotifyHref = 'https://accounts.spotify.com/authorize';
        this.clientId = '7bcfc8881405485ba63cb16db9d07760';
        this.responseType = 'token';
        this.redirectUrl = 'http://localhost:4200/';
    }
    AuthService.prototype.getToken = function () {
        // this.authorize();
        console.log(localStorage.getItem('token'));
        if (!localStorage.getItem('token')) {
            var match = window.location.hash.match(/#access_token=(.*?)&/);
            var token = match && match[1];
            localStorage.setItem('token', token);
            this.authorize();
        }
        return localStorage.getItem('token');
    };
    AuthService.prototype.authorize = function () {
        // localStorage.removeItem('token');
        window
            .location
            .replace(this.spotifyHref + "?client_id=" + this.clientId + "&response_type=" + this.responseType + "&redirect_uri=" + this.redirectUrl);
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
