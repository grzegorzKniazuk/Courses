"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Worker = /** @class */ (function () {
    function Worker(id, firstName, // przy podaniu wlasciwosci parametrycznych nie musimy definiowac wlasciwosci
    lastName, yearOfGranulation, languages, hasDriverLicence, position, skills) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearOfGranulation = yearOfGranulation;
        this.languages = languages;
        this.hasDriverLicence = hasDriverLicence;
        this.position = position;
        this.skills = skills;
    }
    ;
    Worker.prototype.getFullName = function () {
        return this.firstName + ' ' + this.lastName;
    };
    ;
    Object.defineProperty(Worker.prototype, "idNumber", {
        get: function () {
            return this.id;
        },
        set: function (id) {
            this.id = id;
        },
        enumerable: true,
        configurable: true
    });
    Worker.legalNote = 'Some legal information'; // pole statyczne, dostepne tylko bezposrednio w klasach
    return Worker;
}());
exports.Worker = Worker;
