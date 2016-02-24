var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use(express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/device', (req, res) => {
    res.sendFile(__dirname + '/public/device.html');
});

io.on('connection', (socket) => {
    socket.on('data', (data) => {
        socket.broadcast.emit('data', data);
    });
});

http.listen(process.env.PORT || 8080, () => {
    console.log('Listening on port %s', process.env.PORT || 8080)
});