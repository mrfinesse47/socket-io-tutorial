const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder

app.use(express.static(path.join(__dirname, "public")));

//run when a client connects
io.on("connection", (socket) => {
  //console.log("new web socket connection");

  //welcome current user
  socket.emit("message", "welcome to ChatCord!");

  //broadcast when a user connects too all except the client thats connecting
  socket.broadcast.emit("a user has joined the chat");

  //when client disconnects
  socket.on("disconnect", () => {
    io.emit("message", "a user has left the chat");
  }); //to all clients in general
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`server running on Port:${PORT}`);
});
