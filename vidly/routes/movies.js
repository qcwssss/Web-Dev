const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../models/Movie');
const { Genre } = require('../models/Genre');


router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findOne({ name: req.body.genre })
    if (!genre) return res.status(404).send('genre not found!');

    let movie = new Movie({ 
        title: req.body.title, 
        genre: { 
            _id: genre._id, 
            name: genre.name 
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,    
    });
    movie = await movie.save();
    res.send(movie);
});


router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findOne({ name: req.body.genre })
    if (!genre) return res.status(404).send('genre not found!');

    const movie = await Movie.findByIdAndUpdate(
        req.params.id, 
        { 
            title: req.body.title, 
            genre: { 
                _id: genre._id, 
                name: genre.name 
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
        }, 
        { new: true } 
    );
    
    if (!movie) return res.status(404).send('The movie with the given ID not found');

    res.send(movie);
});

router.delete('/:id', auth, async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id); 
  
    if (!movie) return res.status(404).send('The movie with the given ID not found');
    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) return res.status(404).send('The genre with the given ID not found');
    res.send(movie);
});

module.exports = router;