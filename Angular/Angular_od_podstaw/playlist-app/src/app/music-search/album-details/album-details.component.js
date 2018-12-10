"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AlbumDetailsComponent = /** @class */ (function () {
    function AlbumDetailsComponent(musicService, activatedRoute) {
        this.musicService = musicService;
        this.activatedRoute = activatedRoute;
    }
    AlbumDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.musicService
            .getAlbum(this.activatedRoute.snapshot.params['id']) // wyciaganie snapshota z adresu
            .subscribe(function (album) {
            _this.album = album;
        });
    };
    AlbumDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-album-details',
            templateUrl: './album-details.component.html',
            styleUrls: ['./album-details.component.css']
        })
    ], AlbumDetailsComponent);
    return AlbumDetailsComponent;
}());
exports.AlbumDetailsComponent = AlbumDetailsComponent;
