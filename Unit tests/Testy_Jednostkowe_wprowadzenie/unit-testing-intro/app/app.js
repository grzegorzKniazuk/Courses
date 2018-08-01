
let codes = {
    'Poland' : 48,
};

exports.findPrefixCode = function (country) {
    return (codes[country])? codes[country] : 'Unknown country';
};

// funkcja dla sprawdzania wartosci brzegowych
exports.isBetween0and1000 = function (value) {
    return value > 0 && value < 1000;
};

exports.checkString = function (string) {
    if (typeof string === "string") {
        return string.length;
    } else {
        throw new Error('Valid string is required');
    }
};

exports.getArrLength = function (arr) {
    return arr.length;
};

function App(id,name) {
    this.name = name;
    this.id = id;
}

App.prototype.getName = function(){
    return this.name;
};

App.prototype.getID = function(){
    return this.id;
};

App.prototype.reset = function(){
    this.id = null;
    this.name = null;
};

module.exports = App;

