exports.load = function(dir){
  return new Promise((resolve, reject) => {
    let events = {};
    const fs = require('fs');
    fs.readdir(dir, (err, files) => {
      if(err){
        reject('Error reading events folder');
        return;
      }
      files.forEach((file) => {
        console.log('Load file: ' + file);
        const m = require(dir + '/' + file);
        const eventName = m.eventName || file.replace('.js', '');
        events[eventName] = m.go;
      });
      resolve(events);
    });
  });
}
