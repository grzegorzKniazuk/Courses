"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var music_search_component_1 = require("./music-search/music-search.component");
var album_list_component_1 = require("./album-list/album-list.component");
var album_card_component_1 = require("./album-card/album-card.component");
var music_search_service_1 = require("./music-search.service");
var album_search_form_component_1 = require("./album-search-form/album-search-form.component");
var forms_1 = require("@angular/forms");
var music_search_routing_1 = require("./music-search.routing");
var http_1 = require("@angular/common/http");
var album_details_component_1 = require("./album-details/album-details.component");
var tracklist_component_1 = require("./tracklist/tracklist.component");
var MusicSearchModule = /** @class */ (function () {
    function MusicSearchModule() {
    }
    MusicSearchModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                music_search_routing_1.routerModule,
                http_1.HttpClientModule,
            ],
            declarations: [
                music_search_component_1.MusicSearchComponent,
                album_list_component_1.AlbumListComponent,
                album_card_component_1.AlbumCardComponent,
                album_search_form_component_1.AlbumSearchFormComponent,
                album_details_component_1.AlbumDetailsComponent,
                tracklist_component_1.TracklistComponent,
            ],
            exports: [
                music_search_component_1.MusicSearchComponent,
            ],
            providers: [
                music_search_service_1.MusicSearchService,
            ]
        })
    ], MusicSearchModule);
    return MusicSearchModule;
}());
exports.MusicSearchModule = MusicSearchModule;
