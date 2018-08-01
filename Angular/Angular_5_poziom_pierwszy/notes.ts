export class AppComponent { // komponent
    name : string = "Grzegorz Kniażuk";
    photoUrl : string = '../assets/images/IMG_5879.JPG'; // property binding - przypisanie wartosci src ze zmiennej
    nameColor : string = 'blue'; // property binding - style
    isActive : boolean = false; // propertyy binding - klasy css


    constructor() {
        setTimeout(() => {
            this.name += ' Mistrz';
        }, 1000);
    }

    toggleUnderline() {
        this.isActive = !this.isActive;
    }

    changeColor() {
        this.nameColor = this.nameColor === 'blue' ? 'red' : 'blue';
    }
}