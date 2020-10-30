const express = require('express');
const router = express.Router();

const db = require('../models');

const categories = ['Itinerary', 'Arriving Flights', 'Departing Flights', 'Notes'];

// base route is /trips

// --------------------- Index View 
router.get('/', (req,res) => {
    db.Trip.find({}, (err, allTripsFromDB) => {
        if(err) {
            console.log(err);
        } else {
            res.render('trip/tripsIndex', {
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
            console.log(req.body);
            console.log(createdTripInDB);
            res.redirect(`/trips`)
        }
    })
})

// --------------------- Show
router.get('/:id', function(req,res) {
    console.log(req.query);
    const foundNotes = db.Note.find({})
    const foundEvents = db.Itinerary.find({});
    const arrivalFlights = db.Flight.find({ category: 'arrival' });
    const departingFlights = db.Flight.find({ category: 'departure' });
    db.Trip.findById(req.params.id, (err, oneTripFromDB) => {
        if(err){
            console.log(err);
        } else {
            const context = {
                categories: categories,
                selectedCategory: req.query.option,
                oneTrip: oneTripFromDB,
                events: foundEvents,
                notes: foundNotes,
                arrivals: arrivalFlights,
                departures: departingFlights,
            }
            res.render('trip/show', context)
        }
    })
})


// --------------------- Delete
router.delete('/:id', function (req, res) {
    db.Trip.findByIdAndDelete(req.params.id, (err, oneTripFromDB) => {
        if(err) {
            console.log(err);
        } else {
            console.log(oneTripFromDB);
            res.redirect('/trips');
        }
    })
})


// --------------------- Edit
router.get('/:id/edit', function (req,res) {
    db.Trip.findById(req.params.id, (err, oneTripFromDB) => {
        if (err) {
            console.log(err);
        } else {
            const context = {
                oneTrip: oneTripFromDB
            }
            res.render('trip/edit', context)
        }
    })
})


// --------------------- Update
router.put('/:id', function (req, res) {
    db.Trip.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, updatedTrip) => {
        if(err) {
            console.log(err);
        } else {
            console.log(updatedTrip);
            res.redirect(`/trips/${req.params.id}`)
        }
    })
})




module.exports = router;


