// webWorkers
// no access to DOM, Window, Host page
// access to Navigator, Timers, XmlHttpRequest

addEventListener('message', (e) => {
    function fibonacci(n) {
        return n < 1 ? 0
            : n <= 2 ? 1
                : fibonacci(n - 1) + fibonacci(n - 2);
    }
    postMessage(fibonacci(e.data));

}, true);
