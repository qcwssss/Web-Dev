const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register a listener
emitter.on('messageLogged', function(){
    console.log("Listener called");
})

// emit -> making a noise, produce - signallng
// Rasie an event
emitter.emit('messageLogged');

