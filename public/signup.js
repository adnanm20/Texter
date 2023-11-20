var socket = io()

var user_cookie = localStorage.getItem("user_cookie");
if (user_cookie) {
	socket.emit("autologin", { cookie: user_cookie });
}

function login(formEvent) {
	formEvent.preventDefault();

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	socket.emit("signup", { username: username, password: password });
	return;
}

socket.on("autologinsuccess", (data) => {
	window.location = "/";
});

socket.on("signupsuccess", (data) => {
	window.location = "/login";
});

socket.on("signupfail", (data) => {
	console.error(data);
});
