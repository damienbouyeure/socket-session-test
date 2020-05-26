var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let  room ;
app.get('/:room', (req, res) => {
    room = req.params.room
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.join(room);
    io.to(room).emit('hi');
});

io.on('connection', (socket) => {

    console.log("la " + room + " est créée")
    socket.on('chat message', (msg) => {
        io.to(room).emit('chat message', msg);


    });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

http.listen(3000, () => {
    console.log('listening on *:3000');
});