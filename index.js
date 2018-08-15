
const fs = require('fs');

var csv = './event_def.csv'

var readDef = function (){
  return new Promise (function(resolve, reject){
    fs.readFile(csv, 'utf8', (err, data) => {
        err ? reject(err) : resolve(data);
    });
  });
}

var parseDef = function(){
  return readDef().then(
    (data) => {
      let lines = data.split(/\r?\n/);
      if (lines.length <= 1) {
        throw 'improper source';
      }
      let attrs = lines[0].split('\,');

      let events = [];
      lines.slice(1, lines.length-1).forEach((curr_line) => {
        let entries = curr_line.split(',');
        let entry = {};
        for (let i = 0; i < attrs.length; i++) {
          entry[attrs[i]] = entries[i];
        }
        events.push(entry);
      });
      return events;
    },
    (err) => {
      throw err;
    }
  );
}

parseDef()
  .then(
    (events)=>{
      console.log(events);
    },
    (err)=>{
      console.log(err);
    }
  );
