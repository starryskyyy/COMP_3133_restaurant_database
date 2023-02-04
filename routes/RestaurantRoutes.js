const express = require('express');
const restaurantModel = require('../models/Restaurant');
const app = express();

// read all restaurants 
app.get('/restaurants', async (req, res) => {

    const restaurants = await restaurantModel.find({})
    try {
        res.status(200).send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
})

// return all restaurant details by cuisine
app.get('/restaurants/cuisine/:name', async (req, res) => {
    const name = req.params.name
    const restaurants = await restaurantModel.find({ cuisine: name })

    try {
        if (restaurants.length != 0) {
            res.send(restaurants);
        } else {
            res.send(JSON.stringify({ status: false, message: "No data found" }))
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// return: 
//The selected columns must include id, cuisines, name, city, resturant_id
//The sorting by the restaurant_id in Ascending or Descending Order based on parameter passed.

app.get('/restaurants', async (req, res) => {

    const restaurants = await restaurantModel.getRestaurants(req.query.sortBy)

    try {
        res.status(200).send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
});
/*  used create new restaurant to see data
app.post('/restaurant', async (req, res) => {
    const restaurant = new restaurantModel(req.body);
    
    try {
      await restaurant.save((err) => {
        if(err){
          res.send(err)
        }else{
          res.send(restaurant);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });
*/

module.exports = app