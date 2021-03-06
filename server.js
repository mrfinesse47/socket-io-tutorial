const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder

app.use(express.static(path.join(__dirname, "public")));

const botName = "ChatCordBot";

//run when a client connects
io.on("connection", (socket) => {
  //console.log("new web socket connection");

  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    //welcome current user
    socket.emit("message", formatMessage(botName, "welcome to chatcord!"));

    //broadcast when a user connects too all except the client thats connecting
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${username} has joined the chat`)
      );
  });

  //listen to chat message

  socket.on("chatMessage", (msg) => {
    io.emit("message", formatMessage("USER", msg));
  });

  //when client disconnects
  socket.on("disconnect", () => {
    io.emit("message", "a user has left the chat");
  }); //to all clients in general
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`server running on Port:${PORT}`);
});
