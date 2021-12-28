const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Movie, validate} = require('../models/Movie');
const { Genre } = require('../models/Genre');


router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let movie = new Movie({ 
        title: req.body.title, 
        genre: await Genre.findOne({ name: req.body.gerne }),
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,    
    });
    movie = await movie.save();
    res.send(movie);
});

module.exports = router;