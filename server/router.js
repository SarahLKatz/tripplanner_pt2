var express = require('express');
var router = express.Router();

var db = require("./models").db;
var {Hotel} = require('./models');
var {Restaurant}= require('./models');
var {Activity} = require('./models');

router.get("/",function(req,res,next){
    console.log('done getted')
    var allAttractions = {}

    var hotel = Hotel.findAll({ include: [{ all: true }] })
                .then(function(hotels) {
                  allAttractions.hotels = hotels;
                })
    
    var restaurant = Restaurant.findAll({ include: [{ all: true }] })
                    .then(function(restaurants) {
                      allAttractions.restaurants = restaurants;
                    })
    var activities = Activity.findAll({ include: [{ all: true }] })
                    .then(function(activities) {
                      allAttractions.activities = activities;
                    })
    
    Promise.all([hotel,restaurant,activities])
    .then(()=>{
      res.json(allAttractions)
    })
    .catch(next);
  })

// // Get the select dom element
// const select = document.getElementById(`hotels-choices`);
// // use `.value` to get the currently selected value
// const selectedId = select.value;

  
module.exports = router;