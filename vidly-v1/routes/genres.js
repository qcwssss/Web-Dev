const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { append } = require('vary');

const mongoose = require('mongoose');
const { func } = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    }
});

const Genre = mongoose.model('Genre', genreSchema);

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort({name: 1})
    res.send(genres);
});

// Add genre
router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let genre = new Genre({ name: req.body.name});
    genre = await genre.save();
    res.send(genre);
});


// Update genre
router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findByIdAndUpdate(
        req.params.id, { name: req.body.name }, {new: true} ); // return the updated
    
    if (!genre) return res.status(404).send('The genre with the given ID not found');

    res.send(genre);
});

// Delete genre
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id); 
  
    if (!genre) return res.status(404).send('The genre with the given ID not found');
    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const genres = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID not found');
    res.send(genres);
});

function validateGenre(genre) {
    const schema = Joi.object({ 
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}

module.exports = router;