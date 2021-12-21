const express = require('express');
const router = express.Router();

const courses = [
    {id: 1, course: 'math1'},
    {id: 2, course: 'math2'},
    {id: 3, course: 'math3'}
]

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID not found');
    res.send(course);

});

router.put('/:id', (req, res) => {
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

router.post('/', (req, res) => {
    const { error } = validateCourse(req.body); // result.error
    if (error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        course: req.body.course
    };
    courses.push(course);
    res.send(course);
});


router.delete('/:id', (req, res) => {
    // Look up the course
    // Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID not found');

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        course: Joi.string().min(3).required()
    });
    return schema.validate(course);

}

module.exports = router;