// resolve
const p = Promise.resolve({id: 1});
p.then(result => console.log(result));

// reject
// const p_rej = Promise.reject(new Error('reason for rejection...'));
// p_rej.catch(err => console.log(err));

const p1 = new Promise((reslove) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        reslove(1);
    }, 1000);
});

const p2 = new Promise((reslove) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        reslove(2);
    }, 1000);
});

Promise.all([p1, p2])
.then(result => console.log(result));