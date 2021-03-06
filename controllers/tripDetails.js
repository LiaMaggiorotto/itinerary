const express = require('express');
const router = express.Router();

const db = require("../models");

// base route is /tripdetail

// --------------------- Create 
router.post('/:id', function (req, res) {
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
                res.redirect(`/trips/${foundTrip._id}?option=notes`)
            })
        })
    } else if(selectedCategory === 'arrivals') {
        db.Flight.create(req.body, function (err, createdFlight) {
            if(err) {
                console.log(err);
            }
            db.Trip.findById(req.params.id, function (err, foundTrip) {
                if(err) {
                    console.log(err);
                }
                foundTrip.flights.push(createdFlight);
                foundTrip.save();
                res.redirect(`/trips/${foundTrip._id}?option=arrivals`)
            })
        })
    } else if(selectedCategory === 'departures') {   
        db.Flight.create(req.body, function (err, createdFlight) {
            if(err) {
                console.log(err);
            }
            db.Trip.findById(req.params.id, function (err, foundTrip) {
                if(err) {
                    console.log(err);
                }
                foundTrip.flights.push(createdFlight);
                foundTrip.save();
                console.log('Flight:', createdFlight)
                res.redirect(`/trips/${foundTrip._id}?option=departures`)
            })
        })
    }
});


// --------------------- Delete

// itinerary
router.delete('/:tripid/itinerary/:itineraryid', function (req, res) {
    const tripid = req.params.tripid;
    const itineraryid = req.params.itineraryid;
    db.Itinerary.findByIdAndDelete(itineraryid, function (err, oneEventfromDB) {
        if(err) return console.log(err);
        db.Trip.findById(tripid, function (err, oneTrip) {
            if(err) return console.log(err);
            oneTrip.itinerary.remove(oneEventfromDB);
            oneTrip.save();
            res.redirect(`/trips/${tripid}?option=itinerary`)
        })
    })
})

// note
router.delete('/:tripid/note/:noteid', function (req, res) {
    const tripid = req.params.tripid;
    const noteid = req.params.noteid;
    db.Note.findByIdAndDelete(noteid, function (err, oneNoteFromDB) {
        if(err) return console.log(err);
        db.Trip.findById(tripid, function (err, oneTrip) {
            if(err) return console.log(err);
            oneTrip.itinerary.remove(oneNoteFromDB);
            oneTrip.save();
            res.redirect(`/trips/${tripid}?option=notes`)
        })
    })
})

// arrival flight
router.delete('/:tripid/arrivingflight/:flightid', function(req, res) {
    const tripid = req. params.tripid;
    const flightid = req.params.flightid;
    db.Flight.findByIdAndDelete(flightid, function (err, oneFlightFromDB) {
        if(err) return console.log(err);
        db.Trip.findById(tripid, function (err, oneTrip) {
            if(err) return console.log(err);
            oneTrip.flights.remove(oneFlightFromDB);
            oneTrip.save();
            res.redirect(`/trips/${tripid}?option=arrivals`)
        })
    })
})


// departing flight
router.delete('/:tripid/departingflight/:flightid', function(req, res) {
    const tripid = req.params.tripid;
    const flightid = req.params.flightid;
    db.Flight.findByIdAndDelete(flightid, function (err, oneFlightFromDB) {
        if(err) return console.log(err);
        db.Trip.findById(tripid, function (err, oneTrip) {
            if(err) return console.log(err);
            oneTrip.flights.remove(oneFlightFromDB);
            oneTrip.save();
            res.redirect(`/trips/${tripid}?option=departures`)
        })
    })
})


module.exports = router;