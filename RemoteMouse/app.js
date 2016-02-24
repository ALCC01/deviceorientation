var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    robot = require('robotjs');

app.use('/', express.static(__dirname + '/assets'));
robot.moveMouse(robot.getScreenSize().width / 2, robot.getScreenSize().height /2);
console.log(robot.getMousePos());

io.on('connection', (socket) => {
    socket.on('data', (data) => {
        var sensibility = 40;
        var x = Math.ceil((data.gamma / 14) * sensibility) / sensibility;
        var x_variation = robot.getScreenSize().width / 2 * x;
        var y = Math.ceil((data.beta / 10) * sensibility) / sensibility;
        var y_variation = robot.getScreenSize().height / 2 * y;
        robot.moveMouse(robot.getScreenSize().width / 2 + x_variation, robot.getScreenSize().height / 2 +  y_variation)
    });

    socket.on('right_click', () => {
        robot.mouseClick('right')
    });

    socket.on('left_click', () => {
        robot.mouseClick('left')
    })
});

http.listen(process.env.PORT || 8080, () => {
    console.info('Listening on port %s', process.env.PORT || 8080)
});
