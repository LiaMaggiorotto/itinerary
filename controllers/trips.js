const express = require('express');
const router = express.Router();

const db = require('../models');

const categories = ['Arriving Flights, Departing Flights, Itinerary, Notes'];

// --------------------- Index View 
router.get('/', (req,res) => {
    db.Trip.find({}, (err, allTripsFromDB) => {
        if(err) {
            console.log(err);
        } else {
            res.render('/trip/tripsIndex.ejs', {
                allTrips: allTripsFromDB
            });
        }
    });
});


// --------------------- New 
router.get('/newtrip', function (req, res) {
        const foundTrips = db.Trip.find({});
        const context = {
            trips: foundTrips,
        }
        res.render('trip/new', context);
});


// --------------------- Create 
router.post('/', function (req, res) {
    db.Trip.create(req.body, function (err, createdTripInDB) {
        if(err) {
            console.log(err);
        } else {
            console.log(createdTripInDB);
            res.redirect(`/trips`)
        }
    })
})

// --------------------- Show


// --------------------- Edit


// --------------------- Update


// --------------------- Delete



module.exports = router;


