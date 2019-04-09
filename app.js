const fs = require('fs');     
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const date = new Date();

app.use("/", express.static(__dirname + '/'));

app.get('/index.html', function(req, res){
    if(req.url == "/index.html"){ 
        fs.readFile('index.html', function(err, data){
            
        });
    }
});

app.get('/latin-to-morse.html', function(req, res){
    if(req.url == "/latin-to-morse.html"){ 
        fs.readFile('latin-to-morse.html', function(err, data){
            
        });
    }
});

app.get('/morse-to-latin.html', function(req, res){
    if(req.url == "/morse-to-latin.html"){ 
        fs.readFile('morse-to-latin.html', function(err, data){
            
        });
    }
});

function writeText(data){
    let log = data + " -- " + date.getHours() + ":" + date.getMinutes() +
    " / " + date.getDate() + "." + (date.getMonth() + 1) + "." + 
    date.getFullYear() + '\r\n';

    fs.appendFile('log.txt', log, (err) => {
        if (err) throw err; 
    });
}

io.on('connection', function(socket){
    writeText("A user connected");
    socket.on('disconnect', function(){
        writeText("A user disconnected");
    });
});

http.listen(3000, function(){
    console.log('Socket.io listening on *:3000');
});