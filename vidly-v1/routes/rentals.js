const express = require('express');
const router = express.Router();
const {Rental, validate} = require('../models/Rental');
const { Movie } = require('../models/Movie');


router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('price');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findOne({ title: req.body.movie })
    if (!movie) return res.status(404).send('movie not found!');

    let rental = new Rental({ 
        movie: { 
            title: movie.title, 
            _id: movie._id, 
        },
        price: req.body.price,    
    });
    rental = await rental.save();
    res.send(rental);
});

module.exports = router;