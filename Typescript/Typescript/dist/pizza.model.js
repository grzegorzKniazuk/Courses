"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// enum numeryczny
var Status;
(function (Status) {
    Status[Status["Ordered"] = 0] = "Ordered";
    Status[Status["Baked"] = 1] = "Baked";
    Status[Status["Sold"] = 2] = "Sold"; // 2
})(Status = exports.Status || (exports.Status = {}));
// enum stringowy
var Size;
(function (Size) {
    Size["small"] = "small";
    Size["medium"] = "medium";
    Size["large"] = "large";
})(Size = exports.Size || (exports.Size = {}));
