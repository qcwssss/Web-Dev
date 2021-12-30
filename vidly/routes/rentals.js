const express = require('express');
const router = express.Router();
const {Rental, validate} = require('../models/Rental');
const { Movie } = require('../models/Movie');
const { Customer } = require('../models/Customer');


router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findOne({ title: req.body.movie })
    if (!movie) return res.status(404).send('movie not found!');

    const customer = await Customer.findOne({ name: req.body.customer })
    if (!customer) return res.status(404).send('customer not found!');

    let rental = new Rental({ 
        movie: { 
            _id: movie._id, 
            title: movie.title, 
            dailyRentalRate: movie.dailyRentalRate,
        },
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        }
    });
    rental = await rental.save();

    movie.numberInStock--;
    movie.save();
    res.send(rental);
});

module.exports = router;