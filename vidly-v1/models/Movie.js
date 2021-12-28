const Joi = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
    },
    numberInStock: {
        type: Number,
        required: true,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
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
