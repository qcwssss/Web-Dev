const os = require('os');

const totalMemory = os.totalmem();
const freeMemory = os.freemem();

// Template string
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);