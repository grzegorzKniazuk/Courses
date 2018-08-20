import { IFactory } from "./interfaceIFactory";
import { IWorker } from "./interfaceIWorker";

class Factory<T extends IWorker> implements IFactory<T> { // klasa musi byc rowniez oznaczona jako typ generyczny jesli implementujemy interfejs generyczny
    container : Array<T> = [];
    push(newElement : T) : Array<T> {
        this.container.push(newElement);
        return this.container;
    }
    remove(element : T) {
        this.container.splice(this.container.indexOf(element),1);
    };
    showElements() : void{
        console.log(this.container);
    };
    shift() : T {
        return this.container.shift();
    };
}

export { Factory }
