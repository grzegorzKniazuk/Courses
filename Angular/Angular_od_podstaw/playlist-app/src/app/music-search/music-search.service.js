"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var from_1 = require("rxjs/internal/observable/from");
var operators_1 = require("rxjs/operators");
var MusicSearchService = /** @class */ (function () {
    function MusicSearchService(httpClient, auth) {
        this.httpClient = httpClient;
        this.auth = auth;
        this.albums = [];
        this.albumsStream = new rxjs_1.Subject();
        this.search('superman');
    }
    MusicSearchService.prototype.getAlbumsStream = function () {
        return from_1.from(this.albumsStream).pipe(operators_1.startWith(this.albums));
    };
    MusicSearchService.prototype.search = function (query) {
        var _this = this;
        var url = "https://api.spotify.com/v1/search?type=album&market=PL&query=" + query;
        this.httpClient.get(url, {
            headers: new http_1.HttpHeaders({
                'Authorization': 'Bearer ' + this.auth.getToken(),
            })
        }).pipe(operators_1.map(function (response) {
            var data = JSON.parse(JSON.stringify(response));
            return data.albums.items;
        })).pipe(operators_1.tap(function (albums) {
            _this.albums = albums;
        })).subscribe(function () {
            _this.albumsStream.next(_this.albums);
        });
    };
    MusicSearchService.prototype.getAlbum = function (id) {
        var url = "https://api.spotify.com/v1/albums/" + id;
        return this.httpClient.get(url, {
            headers: new http_1.HttpHeaders({
                'Authorization': 'Bearer ' + this.auth.getToken(),
            })
        }).pipe(operators_1.map(function (response) {
            return JSON.parse(JSON.stringify(response));
        }));
    };
    MusicSearchService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MusicSearchService);
    return MusicSearchService;
}());
exports.MusicSearchService = MusicSearchService;
