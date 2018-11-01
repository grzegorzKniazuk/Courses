let ws = require('nodejs-websocket');
let server = ws.createServer(function (connection) {

    connection.on('text', function (data) {

        let dataObject = JSON.parse(data);

        if (dataObject.type === 'join') {
            connection.nickName = dataObject.name;

            sendToAll({
                type: 'status',
                message: connection.nickName + 'dołączył do czatu.',
            });
        } else if (dataObject.type === 'message') {
            sendToAll({
                type: 'message',
                name: connection.nickName,
                message: dataObject.message,
            });
        }
    });

    connection.on('error', function (error) {
       console.log('Przerwano polaczenie');
    });

}).listen(8000, 'localhost', function () {
    console.log('Serwer aktywny...');
});

function sendToAll(data) {
    let msg = JSON.stringify(data);

    server.connections.forEach(function (connection) {
        connection.sendText(msg);
    });
}