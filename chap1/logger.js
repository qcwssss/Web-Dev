console.log(__dirname);
console.log(__filename);
let url = 'http://mylogger.io/log';


function log(message) {
    // Send an HTTP request
    console.log(message);    
}


// export an object
// module.exports.log = log;
// module.exports.endPoint = url;

// export a function
module.exports = log;
