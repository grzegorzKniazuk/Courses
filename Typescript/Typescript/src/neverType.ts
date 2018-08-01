// czym jest typ never?
// typ never reprezentuje wartosci ktore nigdy nie wystapia

const showError = (msg : string) => {throw new Error(msg)}; // zwrot jest typu never

// lub petle while ktore nigdy sie nie koncza - zwraca never
const showErrors = () => {
    while (true) {
        console.log('Error');
    }
};