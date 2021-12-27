const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { append } = require('vary');
const { func } = require('joi');

const {Genre, validate} = require('../models/Genre');


router.get('/', async (req, res) => {
    const genres = await Genre.find().sort({name: 1})
    res.send(genres);
});

// Add genre
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let genre = new Genre({ name: req.body.name});
    genre = await genre.save();
    res.send(genre);
});


// Update genre
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
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

module.exports = router;