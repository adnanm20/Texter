var socket = io()

var user_cookie = localStorage.getItem("user_cookie");
if (user_cookie) {
	socket.emit("autologin", {cookie: user_cookie});
}

function login(formEvent) {
	formEvent.preventDefault();

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	socket.emit("login", {username: username, password: password});
	return;
}

socket.on("autologinsuccess", (data) => {
	console.log(data);
});

socket.on("loginsuccess", (data) => {
	localStorage.setItem("user_cookie", data.user_cookie);
	console.log("login successful");
});

socket.on("loginfail", (data) => {
	switch(data.reason) {
		case "wrongpw":
			console.log("Wrong password");
			break;
		case "nouser":
			console.log("User doesn't exist");
			break;
	}
});
