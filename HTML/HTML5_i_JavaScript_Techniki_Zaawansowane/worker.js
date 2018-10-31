self.addEventListener('message', function (event) {
    event.data;
    self.postMessage('dane');
    self.close();
});

// dla sharedWorker
self.addEventListener('connect', function (event) {

});

importScripts('');