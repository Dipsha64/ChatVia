const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");

/***socket connection */
const server = http.createServer(app);
const io = new Server(server,{
    cors : {
        origin : "http://localhost:3000",
        credentials : true
    }
})

//online user
const onlineUser = new Set();
const userSocketMap = {}; // {userId->socketId}

// Socket.IO connection with JWT authentication
// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     const user = verifyToken(token);
  
//     if (user) {
//       socket.user = user;
//       return next();
//     }
//     return next(new Error('Authentication error'));
// });

io.on('connection',async(socket)=>{
    const userId = socket.handshake.auth.userId;
    console.log("userId", userId);

    if(userId !== undefined){
        userSocketMap[userId] = socket.id;
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("disconnect", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

module.exports = {
    app,
    server
}