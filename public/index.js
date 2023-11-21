let socket = io();
let currentUsername = "";

let user_cookie = localStorage.getItem("user_cookie");
if (user_cookie) {
	socket.emit("autologin", { cookie: user_cookie });
}

socket.on("autologinsuccess", (data) => {
	currentUsername = data;
});

socket.on("autologinfail", () => {
	window.location = "/login";
});

function createChannel(formEvent) {
	formEvent.preventDefault();

	let channelName = document.getElementById("channelName").value;
	let channelMembers = document.getElementById("channelMembers").value.split(", ");
	channelMembers.push(currentUsername);
	socket.emit("createChannel", {channelName: channelName, channelMembers: channelMembers});
}

socket.on("createChannelsuccess", (data) => {
	console.log(data);
});
socket.on("createChannelfail", (data) => {
	console.error(data.reason);
});

socket.on("addedToChannel", (data) => {
	console.log(data);
});