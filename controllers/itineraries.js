const express = require('express');
const router = express.Router();

const db = require("../models");

// base route is /trips
const eventCategories = ['Dining', 'Entertainment', 'Travel', 'Fitness', 'Check In', 'Check Out', 'Leisure', 'Tour'];

// --------------------- Index View 
router.get('/:id', function (req, res) {
    db.Trip.findById((req.params.id), function (err, allEventsFromDB) {
        if(err) {
            console.log(err);
        } else {
            const context = {
                allEvents: allEventsFromDB,
                categories: eventCategories,
            }
            res.render('trip/show', context)
        }
    })
});


// --------------------- New 
router.get('/:id/newevent', function (req, res) {
    db.Trip.findById(req.params.id, function (err, oneTripFromDB) {
        if(err) {
            console.log(err);
        } else {
            const context = {
                oneTrip: oneTripFromDB, 
                categories: eventCategories
            }
            res.render('trip/show', context)
        }
    })
})

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