const debug = require('debug')('app:startip');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./logger');
const courses = require('./courses');
const express = require('express');
const app = express();

// Templating engine
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // req.body -> json
app.use(express.urlencoded({ extended: true })); // key=value && key=value
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

app.use(logger);

app.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello'});
}); 

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});