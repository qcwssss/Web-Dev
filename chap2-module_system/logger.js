// console.log(__dirname);

const EventEmitter = require("events");

// console.log(__filename);
let url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
    log(message) {
        // Send an HTTP request
        console.log(message);    

         // Rasie an event
        this.emit('messageLogged', {id: 1, url: 'http://'});
    }
}

// export a function
module.exports = Logger;
