"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var AlbumSearchFormComponent = /** @class */ (function () {
    function AlbumSearchFormComponent(musicSearchService) {
        var _this = this;
        this.musicSearchService = musicSearchService;
        this.searchForm = new forms_1.FormGroup({
            'query': new forms_1.FormControl('Batman'),
        });
        this.searchForm.get('query') // get pobiera warosc konkretnej kontrolki
            .valueChanges
            .pipe(operators_1.filter(function (query) { return query.length > 3; })) // 3 litery, minimalna dlugosc zapytania
            .pipe(operators_1.distinctUntilChanged()) // czy wartosc sie zmienila
            .pipe(operators_1.debounceTime(400)) // czas od ostatniego wcisniecia przycisku
            .subscribe(function (query) {
            _this.musicSearchService.search(query);
        });
    }
    AlbumSearchFormComponent.prototype.ngOnInit = function () {
    };
    AlbumSearchFormComponent = __decorate([
        core_1.Component({
            selector: 'app-album-search-form',
            templateUrl: './album-search-form.component.html',
            styleUrls: ['./album-search-form.component.css']
        })
    ], AlbumSearchFormComponent);
    return AlbumSearchFormComponent;
}());
exports.AlbumSearchFormComponent = AlbumSearchFormComponent;
