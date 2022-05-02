const socket = io();

const chatForm = document.getElementById("chat-form");

//to prevent default if you want

// document
//   .getElementById("chat-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//   });

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
});
//output message to dom

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">Kevin<span>9:12am</span></p>
  <p class="text">
   ${message}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
