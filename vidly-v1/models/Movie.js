const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('../models/Genre');


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    genre: {
        type: genreSchema,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 255,
    },
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = Joi.object({ 
        title: Joi.string().min(5).max(50).required(),
        genre: Joi.string().min(5).max(50).required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required(),
    });
    return schema.validate(movie);
}

exports.Movie = Movie; 
exports.validate = validateMovie; 
