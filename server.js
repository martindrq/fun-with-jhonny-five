const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let clientSocket = null;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.of("/tessle").on("connection", function(socket) {
  console.log("connect tessle");
  socket.on("light-change", change => {
    clientSocket.emit("light-notify", change);
  });
});

io.of("/client").on("connection", function(socket) {
  console.log("connect client");
  clientSocket = socket;
});

const instance = server.listen(3000, function() {
  console.log("app running on port.", instance.address().port);
});
