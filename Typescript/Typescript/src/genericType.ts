// dla kolejek

// kolejka FIFO - first in - first out

// ŁĄCZENIE DEKLARACJI

interface Item {
    name : string;
    method1() : void;
}

interface Item {
    code : string;
    method2() : void;
}

// jest rownowazne z - polaczone automatycznie
//interface Item {
//    name : string;
//    code : string;
//    method1() : void;
//    method2() : void;
//}

interface ProductItem extends Item{
    id : number;
}

interface ProductsQueue<T> { // interfejs generyczny
    push(item : T) : void;
    getAll() : T[];
}

class Queue<T extends Item> implements ProductsQueue<T> { // typ generyczny w klasie rozszerzajacy interfejs
    private data : T[] = [];

    push(item : T) {
        this.data.push(item);
    }

    pop() {
        this.data.shift();
    }

    getAll() {
        return this.data;
    }
}

//const people = new Queue<string>(); // definujemy jaki typ generyczny bedziemy podawac
//people.push('Marek');
//console.log(people);

//const numbers = new Queue<number>(); // definujemy jaki typ generyczny bedziemy podawac
//numbers.push(1);
//console.log(numbers);

const productItems = new Queue<ProductItem>(); // definujemy jaki typ generyczny bedziemy podawac