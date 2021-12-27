const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { append } = require('vary');

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20,
    },
    isGold: {
        type: Boolean,
        // required: true,
        default: false,
    }
});

const Customer = mongoose.model('Customer', customerSchema);

router.get('/', (req, res) => {
    const customers = Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({ name: req.body.name, phone: req.body.phone });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = Customer.findByIdAndUpdate(
        req.params.id, 
        { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone }
    );
    if (!customer) return res.status(404).send('The customer with the given id was not found!');
    
    res.send(customer);
});

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(5).required(),
        isGold: Joi.boolean()
    });
    return schema.validate(customer);
}


module.exports = router;