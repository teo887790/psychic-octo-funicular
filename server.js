const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const pty = require("node-pty");
const path = require("path");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("User connected");

    const shell = process.platform === "win32" ? "powershell.exe" : "bash";
    const ptyProcess = pty.spawn(shell, [], {
        name: "xterm-color",
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env,
    });

    ptyProcess.on("data", (data) => {
        socket.emit("output", data);
    });

    socket.on("input", (input) => {
        ptyProcess.write(input);
    });

    socket.on("disconnect", () => {
        ptyProcess.kill();
        console.log("User disconnected");
    });
});

server.listen(3000, () => console.log("Server running on port 3000"));
