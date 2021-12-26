const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { append } = require('vary');

const mongoose = require('mongoose');
const { func } = require('joi');


const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Horror'},
    {id: 3, name: 'Romance'}
]

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

const Genre = mongoose.model('Genre', genreSchema);

async function createGenre(newGenre) {
    const genre = new Genre({
        name: newGenre,
    });
    try {
        const result = await genre.save();
        console.log(result);
    } catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }

    }
}

router.get('/', (req, res) => {
    res.send(genres);
});

// Update genre
router.put('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status('The genre with the given ID not found');
    // Validate
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
    // Update
    genre.name = req.body.name;
    res.send(genre);
});

// Add genre
router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);
    // const genre = {
    //     id: genres.length + 1,
    //     name: req.body.name
    // };
    // genres.push(genre);
    createGenre(req.body.name);
    res.send('Success');
});

// Delete genre
router.delete('/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status('The genre with the given ID not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1); // (start, deleteCount)
    res.send(genre);
});

function validateGenre(genre) {
    const schema = Joi.object({ 
        name: Joi.string().min(6).required()
    });
    return schema.validate(genre);
}

module.exports = router;