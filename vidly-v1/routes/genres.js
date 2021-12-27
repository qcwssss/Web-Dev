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
        minlength: 5,
        maxlength: 50,
    }
});

const Genre = mongoose.model('Genre', genreSchema);

async function getGenres() {
    const genres = await Genre
        .find()
        .select({_id: 1, name: 1});
    console.log(genres);
    return genres;
}

router.get('/', async (req, res) => {
    const genres = await Genre.find().select({_id: 1, name: 1});;
    res.send(genres);
});

// Update genre
router.put('/:id', async (req, res) => {
    // let genre = genres.find(g => g.id === parseInt(req.params.id));
    // if (!genre) return res.status('The genre with the given ID not found');
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findByIdAndUpdate(
        req.params.id, { name: req.body.name }, {new: true} ); // return the updated
    
    if (!genre) return res.status(404).send('The genre with the given ID not found');

    res.send(genre);
});

// Add genre
router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = new Genre({ name: req.body.name});
    await genre.save();
    res.send(genre);
});

// Delete genre
router.delete('/:id', async (req, res) => {
    // const { error } = validateGenre(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndRemove(req.params.id); 
  
    if (!genre) return res.status(404).send('The genre with the given ID not found');
    res.send(genre);
});

function validateGenre(genre) {
    const schema = Joi.object({ 
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}

module.exports = router;