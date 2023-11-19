const crypto = require("crypto");
let dbConnection = require("../utilities/dbConnection");
let random = require("../utilities/random");
const socketResponses = require("../utilities/socketResponses.json").login;
const dbQueries = require("../utilities/dbQueries.json").login
// let logger = require("../logger");

exports.eventName = "login";

exports.go = function (data, io, socketid) {

	dbConnection.query(dbQueries.user_uid_salt_pass_by_username_or_email, [data.username, data.username], _callback1);

	function _callback1(err, result) {
		if (err) { logger.log(err); return; }
	
		if (result.length > 0) {
			let hashedPass = crypto.pbkdf2Sync(data.password, result[0].salt, 1000, 64, 'sha512').toString('hex');

			if (result[0].password_hash == hashedPass) {
				let user_cookie = random.getRandomString(32);
				dbConnection.query(dbQueries.new_session_uid_cookie_days, [result[0].id, user_cookie, 30], _callback2);
				io.to(socketid).emit(socketResponses.success, { user_cookie: user_cookie });
			}
			else {
				io.to(socketid).emit(socketResponses.fail, { reason: "wrongpw" });
			}
		}
		else {
			io.to(socketid).emit(socketResponses.fail, { reason: "nouser" });
		}
	}

	function _callback2(err) {
		if (err) { logger.log(err); return; }
	}
}
