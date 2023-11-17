const crypto = require("crypto");
const random = require("../random");
const dbConnection = require("../dbConnection");
const socketResponses = require("../socketResponses.json").signup;
const dbQueries = require("../dbQueries.json").signup

exports.eventName = "signup"

exports.go = function (data, io, socketid) {
	dbConnection.query(dbQueries.get_id_by_username_or_email, [data.username, data.email], function (err, result) {
		if (result.length > 0) {
			io.to(socketid).emit(socketResponses.fail, "user exists");
			return;
		}

		var salt;
		var hashedPass;
		var input;
		salt = random.getRandomString(32);

		hashedPass = crypto.pbkdf2Sync(data.password, salt, 1000, 64, 'sha512').toString('hex');
		input = [data.username, salt, hashedPass];

		console.log(input);
		dbConnection.query(dbQueries.insert_new_user, input, function (err, response) {
			if (err) {
				logger.log(err);
				return;
			}
						
			io.to(socketid).emit(socketResponses.success, data.username);
		});
	});
};