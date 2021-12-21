const debug = require('debug')('app:startip');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

// Templating engine
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // req.body -> json
app.use(express.urlencoded({ extended: true })); // key=value && key=value
app.use(express.static('public'));
app.use(helmet());

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

app.use(logger);

const courses = [
    {id: 1, course: 'math1'},
    {id: 2, course: 'math2'},
    {id: 3, course: 'math3'}
]

app.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello'});
}); 

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID not found');
    res.send(course);

});

app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID not found');

    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validateCourse(req.body); // result.error
    if (error) return res.status(400).send(result.error.details[0].message);

    // Update course
    course.course = req.body.course;
    // Return the updated course
    res.send(course);

});

function validateCourse(course) {
    const schema = Joi.object({
        course: Joi.string().min(3).required()
    });
    return schema.validate(course);

}

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body); // result.error
    if (error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        course: req.body.course
    };
    courses.push(course);
    res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID not found');

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});