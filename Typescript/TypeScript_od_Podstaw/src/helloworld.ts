const whoIAmValue : string = 'world';

function sayHello(toWhom : string) { // typowanie parametrow
    console.log('Hello ' + toWhom);
}

// typ VOID - nie zwracam nic
// typ ANY - mogę zwrócić cokolwiek

function whoIAm(whoIAmValue : string) : string { // typowanie zwracanego typu
    return whoIAmValue;
}

sayHello('Grzegorz');



