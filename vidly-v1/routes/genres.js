const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const {Genre, validate} = require('../models/Genre');

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort({name: 1})
    res.send(genres);
});

// Add genre
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let genre = new Genre({ name: req.body.name});
    genre = await genre.save();
    res.send(genre);
});


// Update genre
router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findByIdAndUpdate(
        req.params.id, { name: req.body.name }, {new: true} ); // return the updated
    
    if (!genre) return res.status(404).send('The genre with the given ID not found');

    res.send(genre);
});

// Delete genre
router.delete('/:id', auth, async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id); 
  
    if (!genre) return res.status(404).send('The genre with the given ID not found');
    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID not found');
    res.send(genre);
});

module.exports = router;