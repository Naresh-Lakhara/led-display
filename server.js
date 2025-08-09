const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(express.static("public"));

let latestMessage = "Welcome!";

app.get("/", (req, res) => {
    res.send("Welcome Naresh");
});
app.post("/send", (req, res) => {
    latestMessage = req.body.message;
    io.emit("update", latestMessage);
    res.json({ status: "ok" });
});

io.on("connection", (socket) => {
    socket.emit("update", latestMessage);
});

server.listen(3000, () => console.log("Server running on port 3000"));


