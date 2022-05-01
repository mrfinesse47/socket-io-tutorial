const socket = io();

//to prevent default if you want

// document
//   .getElementById("chat-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//   });

socket.on("message", (msg) => {
  console.log(msg);
});
