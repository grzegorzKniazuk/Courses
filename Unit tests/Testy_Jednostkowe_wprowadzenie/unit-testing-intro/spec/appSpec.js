/*
describe('', function() {

    it('', function() {

        expect().toEqual();
    });
})
 */

/* asercje, funkcje testowe
.toEqual() - sprawdzenie czy wartosc zwracana przez funkcje jest rowna pewnej warosci (==)
.toBeTruthy() - czy funkcja zwroci true
.toBeFalsy() - czy funkcja zwroci false
.toBeUndefined() - czy funkcja zwroci undefined
.toBe() - identycznosc, czy sa to dwa identyczne obiekty (===)
.toThrow() - czy jakiś błąd lub wyjątek został wyrzucony
.not - zaprzeczenie asercji
.toHaveBeenCalled() - czy metoda zostala wywolana
.toHaveBeenCalledWith('') - czy metoda zostala wywolana z poprawnym argumentem
.toBeGraterThan() - czy jest 'wieksze' niz
.andCallFake - wywolanie atrapy funkcji
.calls.length - ile razy dana funkcja zostala wywolana
*/

// import wlasciwej implementacji funkcji
let app = require('../app/app.js');
console.log(app);

// definicja grupy testow
describe('DialarCodeFinder', function () { // tutaj opis testowanej jednostki

    // it - jeden, konkretny test w tym zestawie
    it('should return 48 when Poland is given', function () { // przy jakich warunkach jakiego wyniku sie spodziewamy

        // definicja testu, schemat, asercja
        expect(app.findPrefixCode('Poland')).toEqual(48); // czy dla parametru Poland funkcja zwroci 48?
    })

    it('should return Unknown country when Unknown is given', function () {

        expect(app.findPrefixCode('Unknown')).toEqual('Unknown country'); // powiadomienie dla nieznanego kraju?
    })
});

// sprawdzanie wartosci brzegowych
describe('Value checker', function() {

    // min valid value
    it('should return true when value is 1', function() {
        expect(app.isBetween0and1000(1)).toEqual(true);
    });

    // max valid value
    it('should return true when value is 999', function() {
        expect(app.isBetween0and1000(999)).toBeTruthy();
    });

    // valid value
    it('should return true when value is 324', function() {
        expect(app.isBetween0and1000(324)).toBeTruthy(); // czy zwroci true
    });

    // invalid values
    it('should return false when value is 0', function() {
        expect(app.isBetween0and1000(0)).toBeFalsy(); // czy zwroci false
    });

    // invalid values
    it('should return false when value is 1000', function() {
        expect(app.isBetween0and1000(1000)).toBeFalsy();
    });

    it('should not return undefined', function () {
        expect(app.isBetween0and1000(100)).not.toBeUndefined(); // zaprzeczenie, nie powinno byc undefined
    })
})

// testy wyrzucania wyjatkow
describe('String Checker', function() {

    it('should return 5 when string kursy is given', function() {
        expect(app.checkString('kursy')).toEqual(5);
    });

    it('should throw Error when invalid string is given', function() { // sprawdzenie wyrzucenia bledu
        expect(function(){app.checkString({name: 'kursy'});}).toThrow();
    });
})

/// Wzorzec AAA
describe('Array length', function() {
    it('should return 3 when array with 3 elements is given', function() {
        let arr = [23,55,44]; // Arrange
        expect(app.getArrLength(arr)) // Act
            .toEqual(3); // Assert
    });
})

describe('App', function(){

    var toDoList;

    beforeEach(function(){ // czynnosci wykonywane przed kazdym testem - SetUp
        toDoList = new App(1, 'ToDoList');
    });

    afterEach(function(){ // czynnosci wykonywane po kazdym tescie
        toDoList.reset();
    });

    it('getName() method should return app name when called on App instance', function(){
        expect(toDoList.getName()).toEqual('ToDoList');
    });

    it('getID() method should return app ID when called on App instance', function(){
        expect(toDoList.getID()).toEqual(1);
    });

});




























