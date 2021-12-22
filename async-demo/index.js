console.log('Before');
getUser(1, (user) => {
    // console.log('User', user);
    // Get the repos
    getRepositories(user.username, (userInfo) => {
        console.log('Repos', userInfo.repos);        
    })

});

console.log('After');

// Callbacks
// Promises
// async/await

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({id: id, username: 'mosh'});
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        callback({username: username, repos: ['repo1', 'repo2', 'repo3']})
    }, 2000);
}