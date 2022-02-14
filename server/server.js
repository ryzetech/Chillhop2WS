const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({ port: 4001 });

console.log("---------- Chillhop2WS Server ----------\n--> Made by: ryzetech\n--> Port: 4001\n--> Status: Running\n----------------------------------------");

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(e) {
    let data = JSON.parse(e);
    console.log(data);
    fs.writeFileSync("./title.txt", data.title);
    fs.writeFileSync("./artist.txt", data.artist);
  });
});