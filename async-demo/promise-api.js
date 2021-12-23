// resolve
const p = Promise.resolve({id: 1});
p.then(result => console.log(result));

// reject
// const p_rej = Promise.reject(new Error('reason for rejection...'));
// p_rej.catch(err => console.log(err));

const p1 = new Promise((reslove, reject) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        reject(new Error('something failed'));
    }, 2000);
});

const p2 = new Promise((reslove) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        reslove(2);
    }, 1000);
});

// all vs. race
Promise.race([p1, p2])
.then(result => console.log(result))
.catch(err => console.log('Error:', err.message));