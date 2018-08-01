export interface Pizza {
    name : string;
    price : number | string; // Union type - operator "lub" do skladania typow
    size : string;
    status : number;
    cancelable : boolean;
}

// enum numeryczny
export enum Status {
    Ordered, // 0
    Baked, // 1
    Sold // 2
}

// enum stringowy
export enum Size {
    small = 'small',
    medium = 'medium',
    large = 'large'
}

// type Size = 'small' | 'medium' | 'large'; // Tworzenie wlasnego typu

// lepszy sposob
// union type
export type SizeKey = keyof typeof Size; // 'small' | 'medium' | 'large'

//-----------------------------------------------------------------------------------------//
// Discriminated Unions - potrafia okreslic jakiego typu jest dana zmienna w danym miejscu //
//-----------------------------------------------------------------------------------------//
export interface Cash {
    type : 'cash',
    currency : string;
}

export interface DebitCard {
    type : 'debitCard',
    code : string;
}

export interface OnlinePayment {
    type : 'onlinePayment',
    bankAccount : number;
}

// stworzony union type pozwala na skorzystanie z ktoregos z typow ze stworzonych interfejsow
export type PaymentMethods = Cash | DebitCard | OnlinePayment; // alias

