"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var music_search_component_1 = require("./music-search/music-search.component");
var album_details_component_1 = require("./album-details/album-details.component");
var routesConfig = [
    { path: 'music', component: music_search_component_1.MusicSearchComponent },
    { path: 'music/album/:id', component: album_details_component_1.AlbumDetailsComponent },
];
// konfiguracja routera
exports.routerModule = router_1.RouterModule.forChild(routesConfig);
