const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, course: 'math1'},
    {id: 2, course: 'math2'},
    {id: 3, course: 'math3'}
]

app.get('/', (req, res) => {
    res.send('Hello World, Brandon');
}); 

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    console.log(course);
    if (!course) res.status(404).send('The course with the given ID not found');
    res.send(course);

});

app.post('/api/courses', (req, res) => {
    const schema = Joi.object({
        course: Joi.string().min(3).required()
    });
    // console.log(req.body);
    const result = schema.validate(req.body);
    // console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        course: req.body.course
    };
    courses.push(course);
    res.send(course);
})

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});