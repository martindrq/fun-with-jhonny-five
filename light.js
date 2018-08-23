var five = require("johnny-five");
var Tessel = require("tessel-io");
var io = require("socket.io-client");

var socket = io("http://172.25.91.32:3000/tessle");

var board = new five.Board({
  io: new Tessel()
});

board.on("ready", () => {
  var light = new five.Light("a7");

  light.on("change", () => {
    socket.emit("light-change", light.level);
  });
});
