"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// IMPORT ---------------------------- //
var enumJobPosition_1 = require("./enumJobPosition");
var Worker_1 = require("./Worker");
var Skill_1 = require("./Skill");
// ----------------------------------- //
var getFullName = function (worker) { return worker.firstName + ' ' + worker.lastName; }; // arrow funcion z jednym parametrem
var getJobPosition = function (worker) { return worker.position; }; // enum jako typ zwracany
var getDisplayOfJobPosition = function (job) { return enumJobPosition_1.JobPosition[job]; };
function getDefaultPosition() {
    return enumJobPosition_1.JobPosition.Admin; // zwrocenie wartosci domyslnej
}
// wartosc domyslna jako funkcja
function getWorkingOnPosition(workers, job) {
    if (job === void 0) { job = getDefaultPosition(); }
    var result = [];
    for (var _i = 0, workers_1 = workers; _i < workers_1.length; _i++) {
        var worker = workers_1[_i];
        if (worker.position === job) {
            result.push(getFullName(worker));
        }
    }
    return result;
}
function showWorkerDetailedInfo(worker) {
    var yearsAfterGraduation = (new Date().getFullYear()) - worker.yearOfGranulation, fullName = worker.firstName + ' ' + worker.lastName;
    if (worker.hasDriverLicence) {
        console.log('Can drive a car');
    }
    if (worker.languages) {
        console.log('Knows: ');
        worker.languages.forEach(function (language) { return console.log(language); });
    }
    else {
        console.log('Knows no extra languages');
    }
}
// parametr domyslny z zalozenia jest tez opcjonalny
function setUserData(index, yearOfGranulation, hasDriverLicence) {
    if (yearOfGranulation === void 0) { yearOfGranulation = 2010; }
    var worker = workers[index];
    if (yearOfGranulation) {
        worker.yearOfGranulation = yearOfGranulation;
    }
    if (worker.hasDriverLicence) {
        worker.hasDriverLicence = hasDriverLicence;
    }
    return worker;
}
// grupowanie parametrow
function setUserLanguages(index) {
    var languages = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        languages[_i - 1] = arguments[_i];
    }
    var worker = workers[index];
    if (languages && languages.length > 0) {
        worker.languages = languages;
    }
    return worker;
}
function addWorker(newWorker) {
    workers.push(newWorker);
    return workers;
}
function getFullNameOfWorker() {
    return this.firstName + ' ' + this.lastName;
}
function wontGiveFullName() {
    return this.firstName + ' wont give full name';
}
function setTeam(team) {
    this.team = team;
}
var workers = [];
var firstWorker = new Worker_1.Worker(0, 'Karol', 'Rogowski', 2009, ['German', 'English'], true, enumJobPosition_1.JobPosition.Admin, [new Skill_1.Skill(3, 'Programming')]);
var secondWorker = new Worker_1.Worker(0, 'Jan', 'Kowalski', 2000, null, false, enumJobPosition_1.JobPosition.Designer, [new Skill_1.Skill(3, 'Programming')]);
workers.push(firstWorker, secondWorker);
showWorkerDetailedInfo(setUserLanguages(0, 'lang1', 'lang2', 'lang3'));
getWorkingOnPosition(workers).forEach(function (fullname) { return console.log(fullname); });
showWorkerDetailedInfo(setUserData(0));
var newWorker = {
    firstName: 'Adam',
    lastName: 'Tyron',
    yearOfGranulation: 2007,
    languages: ['French', 'English'],
    hasDriverLicence: false,
    position: enumJobPosition_1.JobPosition.Admin,
    skills: null,
    getFullName: wontGiveFullName,
    team: null,
    setTeam: setTeam
};
// wyrazenia klasowe
// deklarowowanie wyrazen ktore zachowuja sie za klasy, dla klas uzywanych lokalnie
var ExampleClass = /** @class */ (function () {
    function class_1(id, name) {
        this.id = id;
        this.name = name;
    }
    ;
    class_1.prototype.showIdAndName = function () {
        return 'id: ' + this.id + ' name: ' + this.name;
    };
    return class_1;
}());
var exampleInstance = new ExampleClass(5, 'Placek');
exampleInstance.showIdAndName();
// funkcja generyczna, <T> - parametr generyczny
function DistinctPush(array, newElement) {
    if (array.indexOf(newElement) === -1)
        array.push(newElement);
    return array;
}
var numbers = new Array();
