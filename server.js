var HTTP_PORT = process.env.PORT || 8080;
const express=require('express');
const path=require('path');
const app=express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const users={};
app.use("/static", express.static(path.join(__dirname, "/static")));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "/index.html"));
})
io.on('connection',socket=>{
    socket.on('New-User-Joined',name=>{
        users[socket.id]=name;
        console.log("Enter new user joined");
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message, n:users[socket.id]});
    })
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})
server.listen(HTTP_PORT);