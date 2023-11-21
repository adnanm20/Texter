const dbConnection = require("../utilities/dbConnection");
const dbQueries = require("../utilities/dbQueries.json").autoLogin;
const socketResponses = require("../utilities/socketResponses.json").autoLogin;
let logger = require("../utilities/logger");
let onlineUsers = require("../utilities/onlineUsers");

exports.eventName = "autologin";

exports.go = function (data, io, socketid) {
	dbConnection.query(dbQueries.id_username_by_cookie, [data.cookie], _callback);

	function _callback(err, result) {
		if (err) { logger.log(err); return; }

		if(result.length > 0) {
			onlineUsers.add(result[0].id, socketid, data.cookie);
			io.to(socketid).emit(socketResponses.success, result[0].username);
		} else {
			io.to(socketid).emit(socketResponses.fail);
		}
	}
}