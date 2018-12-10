"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var TracklistComponent = /** @class */ (function () {
    function TracklistComponent() {
    }
    TracklistComponent.prototype.play = function (track, id) {
        id.volume = 0.1;
        if (id.src !== track.preview_url) {
            id.src = track.preview_url;
            id.play();
        }
        else if (id.paused) {
            id.play();
        }
        else {
            id.pause();
        }
    };
    __decorate([
        core_2.Input()
    ], TracklistComponent.prototype, "tracks", void 0);
    TracklistComponent = __decorate([
        core_1.Component({
            selector: 'app-tracklist',
            templateUrl: './tracklist.component.html',
            styleUrls: ['./tracklist.component.css']
        })
    ], TracklistComponent);
    return TracklistComponent;
}());
exports.TracklistComponent = TracklistComponent;
