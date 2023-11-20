const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../logs");

console.log(logDir);

const log = function (data) {
	let date = new Date();
	fs.writeFile(path.join(logDir, date.toISOString() + ".log"), data, function (err) {
		if(err)
		{
			console.log(err);
		}
	});
}

module.exports = {
	log
}
