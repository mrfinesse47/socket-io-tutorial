const socket = io();

const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

//to prevent default if you want

// document
//   .getElementById("chat-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//   });

// get  username and room from url

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

console.log(username);

//join chatroom
socket.emit("joinRoom", { username, room });
//message from server
socket.on("message", (msg) => {
  console.log(msg);
  outputMessage(msg);
});

//meassage submit

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get message text
  const msg = e.target.elements.msg.value;

  //emit message to server
  socket.emit("chatMessage", msg);

  //scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;

  //clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});
//output message to dom

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
  <p class="text">
   ${message.text}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
