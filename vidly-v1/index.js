const express = require('express');
const app = express();
const router = require('./routes/genres')

app.use('/api', router);


const port = 3000 || process.env.PORT;
app.listen(port, ()=> {
    console.log('Listening on port 3000...');
})