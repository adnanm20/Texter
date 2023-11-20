let socket = io()

let user_cookie = localStorage.getItem("user_cookie");
if (user_cookie) {
	socket.emit("autologin", { cookie: user_cookie });
}

function login(formEvent) {
	formEvent.preventDefault();

	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	socket.emit("login", { username: username, password: password });
	return;
}

socket.on("autologinsuccess", (data) => {
	window.location = "/";
});

socket.on("loginsuccess", (data) => {
	localStorage.setItem("user_cookie", data.user_cookie);
	window.location = "/";
});

socket.on("loginfail", (data) => {
	switch (data.reason) {
		case "wrongpw":
			console.log("Wrong password");
			break;
		case "nouser":
			console.log("User doesn't exist");
			break;
	}
});
