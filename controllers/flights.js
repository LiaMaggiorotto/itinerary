const express = require('express');
const router = express.Router();

const db = require("../models");

// --------------------- Create 
router.post('/:id', function (req, res) {
    console.log(req.body);
    db.Flight.create(req.body, function (err, createdFlight) {
        if(err) {
            console.log(err);
        }
        db.Trip.findById(req.params.id, function (err, foundTrip) {
            if(err) {
                console.log(err);
            }
            foundTrip.notes.push(createdFlight);
            foundTrip.save();
            console.log(foundTrip)
            if(createdFlight.category === "Arrival") {
                res.redirect(`/trips/${foundTrip._id}?option=arrivals`)
            }
            res.redirect(`/trip/${foundTrip._id}?option=departures`)
        })
    })
})

// --------------------- Show


// --------------------- Edit


// --------------------- Update


// --------------------- Delete



module.exports = router;