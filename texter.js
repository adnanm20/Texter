const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const path = require('path');
const bodyParser = require('body-parser');
const dbConnection = require("./utilities/dbConnection");

const eventsLoader = require("./eventsLoader");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/login.html"));
});

app.get("/signup", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/signup.html"));
});

app.get("/updates", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/updates.html"));
});

eventsLoader.load(__dirname + "/events")
	.then((events) => {
		io.on("connection", (socket) => {
			console.log("User connected!");
			for (const eventName in events) {
				socket.on(eventName, (data) => {
					events[eventName](data, io, socket.id);
				});
			}
		})
	});

const port = 3000;
server.listen(port, () => {
	console.log("listening on port: " + port.toString());
});

