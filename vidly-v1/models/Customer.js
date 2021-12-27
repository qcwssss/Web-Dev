const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');

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
        minlength: 3,
        maxlength: 20,
    },
    isGold: {
        type: Boolean,
        // required: true,
        default: false,
    }
});

const Customer = mongoose.model('Customer', customerSchema);


function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    });
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;