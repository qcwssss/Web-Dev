console.log('Before');
getUser(1, (user) => {
    console.log('User', user);
});
console.log('After');

// Callbacks
// Promises
// async/await

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({id: id, userName: 'mosh'});
    }, 2000);

}