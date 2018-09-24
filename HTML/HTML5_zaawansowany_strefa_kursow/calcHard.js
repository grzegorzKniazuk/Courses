function calcHard() {
    let i = 0;
    i++;
    postMessage(i);
    setTimeout('calcHard()', 50);
}
calcHard();