// interfejs generyczny

import { IWorker } from "./interfaceIWorker";

interface IFactory<T extends IWorker> { // warunek generycznosci na podstawie innego interfejsu
    container : Array<T>;
    push : (newElement : T) => Array <T>;
    remove : (element : T) => Array <T>;
    showElements : () => void;
    shift : () => T;
}

export { IFactory }