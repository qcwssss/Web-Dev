const Joi = require('joi');
const mongoose = require('mongoose');
const { movieSchema } = require('../models/Movie');
const { customerSchema } = require('../models/Customer');


const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true,
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255,
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                minlength: 0,
                maxlength: 255,
            },
            dateOut: {
                type: Date,
                required: true,
                default: Date.now()
            },
            dateReturned: {
                type: Date
            },
            rentalFee: {
                type: Number,
                // required: true,
                min: 0
            }
        })
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = Joi.object({ 
        movie: Joi.string().required(),
        customer: Joi.string().required(),
    });
    return schema.validate(rental);
}

exports.Rental = Rental; 
exports.validate = validateRental; 
