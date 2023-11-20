const crypto = require("crypto");
const random = require("../utilities/random");
const dbConnection = require("../utilities/dbConnection");
const socketResponses = require("../utilities/socketResponses.json").signup;
const dbQueries = require("../utilities/dbQueries.json").signup
let logger = require("../utilities/logger");

exports.eventName = "signup"

exports.go = function (data, io, socketid) {
	dbConnection.query(dbQueries.user_id_by_username_or_email, [data.username, data.email], _callback1);

	function _callback1(err, result) {
		if (err) { logger.log(err); return; }

		if (result.length > 0) {
			io.to(socketid).emit(socketResponses.fail, "user exists");
			return;
		}

		let salt = random.getRandomString(32);
		let hashedPass = crypto.pbkdf2Sync(data.password, salt, 1000, 64, 'sha512').toString('hex');
		let input = [data.username, salt, hashedPass];

		dbConnection.query(dbQueries.insert_new_user, input, _callback2);
	};
	
	function _callback2(err, result) {
		if (err) { logger.log(err); return; }
	
		io.to(socketid).emit(socketResponses.success, data.username);		
	}
};