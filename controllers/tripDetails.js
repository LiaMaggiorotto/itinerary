const express = require('express');
const router = express.Router();

const db = require("../models");

// base route is /trips

// --------------------- Create 
router.post('/:id', function (req, res) {
    console.log(req.body);
    const selectedCategory = req.query.option;

    if(selectedCategory === 'itinerary') {
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
    } else if(selectedCategory === 'notes') {
        db.Note.create(req.body, function (err, createdNote) {
            if(err) {
                console.log(err);
            }
            db.Trip.findById(req.params.id, function (err, foundTrip) {
                if(err) {
                    console.log(err);
                }
                foundTrip.notes.push(createdNote);
                foundTrip.save();
                console.log(foundTrip)
                res.redirect(`/trips/${foundTrip._id}?option=notes`)
            })
        })
    } else if(selectedCategory === 'flights') {
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
    }
})


// --------------------- Edit


// --------------------- Update


// --------------------- Delete



module.exports = router;