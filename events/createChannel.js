let dbConnection = require("../utilities/dbConnection");
let dbQueries = require("../utilities/dbQueries.json").createChannel;
let socketResponses = require("../utilities/socketResponses.json").createChannel;
let logger = require("../utilities/logger");

exports.eventName = "createChannel";

exports.go = async function (data, io, socketid) {
	getValidUsernames(data.channelMembers).then((validMembers) => {
		if (validMembers.length < 2) {
			io.to(socketid).emit(socketResponses.fail, { reason: "cannot create one person chat" });
			return;
		}
		dbConnection.query(dbQueries.create_channel_by_name, [data.channelName], _callback); // should check name maybe

		function _callback(err, result) {
			if (err) { console.log(err); logger.log(err); return; }

			validMembers.forEach(member => {
				dbConnection.query(dbQueries.create_user_channel_relation_uid_chid, [member.id, result.insertId], (err) => {if(err) {logger.log(err); return; } });
			});
			io.to(socketid).emit(socketResponses.success, {usersAdded : validMembers});
		}

	}).catch(logger.log("how tf?????????"));
}

function getValidUsernames(members) {
	return new Promise(function (resolve, reject) {
		let validMembers = [];
		let query = `SELECT id FROM users WHERE username = ?;`;
		members.forEach((member, index) => {
			dbConnection.query(query, [member], _callback1);

			function _callback1(err, result) {
				if (err) { logger.log(err); return; }

				if (result.length > 0) {
					let i = validMembers.findIndex(el => el.username == member);
					if (i > -1) { return; }

					validMembers.push({ id: result[0].id, username: member });
				}
				if(index == members.length-1) {
					resolve(validMembers);
				}
			};
		});
	});
}
