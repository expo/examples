const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

setInterval(() => {
  io.emit('ping', { data: (new Date())/1});
}, 1000);

http.listen(3000, function(){
  console.log('listening on *:3000');
});
