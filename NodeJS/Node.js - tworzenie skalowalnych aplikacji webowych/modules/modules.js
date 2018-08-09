exports.printText = function(text) {
    console.log(text);
};

// konstruktor modulu
module.exports = function (name, lastname) {
    this.name = name;
    this.lastname = lastname;
    this.showStudent = function () {
        console.log(`Name: ${this.name} lastname: ${this.lastname}`);
        return true;
    }
};
