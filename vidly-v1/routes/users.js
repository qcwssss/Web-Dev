const {User, validate} = require('../models/User');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const users = await User.find().sort({name: 1})
    res.send(users);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');
    // console.log('User is:' , user);
    user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    });
    
    user = await user.save();
    res.send(user);
});

module.exports = router;