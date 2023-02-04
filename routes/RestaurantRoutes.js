const express = require('express');
const restaurantModel = require('../models/Restaurant');
const app = express();

app.get('/restaurants', async (req, res) => {

    const restaurants = await restaurantModel.find({})
    try {
        res.status(200).send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app