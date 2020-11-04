const express = require('express');
const router = express.Router();

const db = require("../models");

// base route is /trips


// --------------------- Create 
router.post('/:id', function (req, res) {
    console.log(req.body);
    db.Itinerary.create(req.body, function (err, createdEvent) {
        if(err) {
            console.log(err);
        }
        db.Trip.findById(req.params.id, function (err, foundTrip) {
            if(err) {
                console.log(err);
            }
            foundTrip.itinerary.push(createdEvent);
            foundTrip.save();
            console.log(foundTrip)
            res.redirect(`/trips/${foundTrip._id}?option=itinerary`)
        })
    })
})


// --------------------- Edit


// --------------------- Update


// --------------------- Delete



module.exports = router;