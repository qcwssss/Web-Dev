const express = require('express');
const app = express();
const genres = require('./routes/genres')

app.use(express.json()); // body parser
app.use('/api/genres', genres);

const port = 3000 || process.env.PORT;
app.listen(port, ()=> {
    console.log('Listening on port 3000...');
})