
// INTERFEJS OPISUJE STRUKTURE - KSZTALT OBIEKTU
interface Customer {
    name : string;
    age? : number; // pole opcjonalne
    address? : Address; // uzycie zagniezdzonego interfejsu
}

// zagniezdzony interfejs
interface Address {
    street : string;
    city : string;
}

function welcome(customer : Customer) : string {
    return `Welcome ${customer.name}`;
}

console.log(welcome({name : 'Grzegorz'}));