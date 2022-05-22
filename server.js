const express = require("express");
const app = express();
const http = require("http");
const path = require('path');
const server = http.createServer(app);

port = 3000
app.use(express.static(__dirname + '/'));
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
  });
  app.get('/smth', function(req, res){
    res.sendFile(path.join(__dirname + '/pages/smth.html'));
  });

  app.get('/admin', function(req, res){
    res.sendFile(path.join(__dirname + '/pages/admin.html'));
  });

server.listen(port, ()=> {
    console.log("listening on *: " + port);
})