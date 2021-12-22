console.log('Before');
getUser(1, getRepositories);

function getRepositories(user) {
    getRepositories(user.username, getCommits);
}

function getCommits(repos) {
    getCommits(repo, dispalyCommits);
}

function dispalyCommits(commits) {
    console.log(commits);
}

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
        callback(['repo1', 'repo2', 'repo3'])
    }, 2000);
}