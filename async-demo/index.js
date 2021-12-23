console.log('Before');
// getUser(1, getRepositories);

// function getRepositories(user) {
//     getRepositories(user.username, getCommits);
// }

// function getCommits(repos) {
//     getCommits(repos, dispalyCommits);
// }

// function dispalyCommits(commits) {
//     console.log(commits);
// }

// Promise-based approach

getUser(1)
    .then(user => getRepositories(user.username))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message));


// async/await approach
async function dispalyCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.username);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } 
    catch (err) {
        console.log('Error:', err.message);
    }

}

dispalyCommits();


console.log('After');

// Callbacks

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({id: id, username: 'mosh'});
        }, 2000);
    }) 

}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('Could not get the repos'));
            
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resovle, reject) => {
        setTimeout(() => {
            console.log('Calling Github API...');
            resovle(['commit', repo]);
        }, 2000);
    })

}