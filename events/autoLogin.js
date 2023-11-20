const dbConnection = require("../utilities/dbConnection");
const dbQueries = require("../utilities/dbQueries.json").autoLogin;
const socketResponses = require("../utilities/socketResponses.json").autoLogin;
let logger = require("../utilities/logger");

exports.eventName = "autologin";

exports.go = function (data, io, socketid) {
	dbConnection.query(dbQueries.username_by_cookie, [data.cookie], _callback);

	function _callback(err, result) {
		if (err) { logger.log(err); return; }

		if(result.length > 0) {
			io.to(socketid).emit(socketResponses.success, result[0].username);
		} else {
			io.to(socketid).emit(socketResponses.fail);
		}
	}
}