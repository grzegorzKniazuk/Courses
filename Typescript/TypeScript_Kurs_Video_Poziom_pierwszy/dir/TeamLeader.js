"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Worker_1 = require("./Worker");
var TeamLeader = /** @class */ (function (_super) {
    __extends(TeamLeader, _super);
    function TeamLeader(id, firstName, lastName, yearOfGranulation, languages, hasDriverLicence, position, skills, yearsAsLeader) {
        var _this = _super.call(this, id, firstName, lastName, yearOfGranulation, languages, hasDriverLicence, position, skills) || this;
        _this.firstName = firstName;
        _this.lastName = lastName;
        _this.yearOfGranulation = yearOfGranulation;
        _this.languages = languages;
        _this.hasDriverLicence = hasDriverLicence;
        _this.position = position;
        _this.skills = skills;
        _this.yearsAsLeader = yearsAsLeader;
        return _this;
    }
    TeamLeader.prototype.getFullName = function () {
        return _super.prototype.getFullName.call(this) + '. ' + this.yearsAsLeader + ' as a leader';
    };
    return TeamLeader;
}(Worker_1.Worker));
exports.TeamLeader = TeamLeader;
