console.log('Before');
const user = getUser(1);
console.log(user);
console.log('After');

// Callbacks
// Promises
// async/await

function getUser(id) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        return {id: id, userName: 'mosh'}

    }, 2000);

    return 1;
}