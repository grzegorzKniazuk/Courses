// INTERFEJS - zestaw metod, ale bez ich implementacji

// tworzenie nowego interfejsu wraz z importem innego
// co to znaczy ze klasa implementuje interfejs? - klasa zapisuje 'kontrakt' z interfejsem

import { Pizza } from "./pizza.model";

export interface Orderable {
    pizzasInOrder : Pizza[];
    order(pizza : Pizza) : void;
}
