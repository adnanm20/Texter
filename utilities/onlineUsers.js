var onlineUsers = [];

const add = function (userId, socketId, cookie) {
	onlineUsers.push({ userId: userId, socketId: socketId, user_cookie: cookie });
}

const remove = function (id) {
	let index = onlineUsers.findIndex(user => { return (user.userId == id || user.socketId == id) });
	if (index < 0) {
		return 0;
	}

	onlineUsers.splice(index, 1);
	return 1;
}

const getUserId = function (socketid) {
	let index = onlineUsers.findIndex(user => user.socketId == socketid);
	if (index < 0) {
		return 0;
	}

	return onlineUsers[index].userId;
}

const getSocketIds = function (userid) {
	return Array.from(onlineUsers.filter(user => user.userId == userid), x => x.socketId);
}

const getCookie = function (socketId) {
	let index = onlineUsers.findIndex(user => user.socketId == socketId);
	if (index < 0) {
		return 0;
	}

	return onlineUsers[index].user_cookie;
}

module.exports = {
	add,
	remove,
	getUserId,
	getSocketIds,
	getCookie
};