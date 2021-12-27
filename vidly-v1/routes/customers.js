const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { append } = require('vary');

const mongoose = require('mongoose');
const { boolean } = require('joi');

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
        required: true,
        default: false,
    }
});

const Customer = mongoose.model('Customer', customerSchema);


module.exports = router;