var socket = io()

function login(formEvent) {
	formEvent.preventDefault();

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	socket.emit("signup", {username: username, password: password});
	return;
}

socket.on("signupsuccess", (data) => {
	console.log(data);
});

socket.on("signupfail", (data) => {
	console.error(data);
});
