const express = require('express');
const router = express.Router();

const db = require('../models');

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
router.get('/:id', async function (req,res) {
    try {
        console.log(req.query);
        const selectedCategory = req.query.option;
        db.Trip.findById(req.params.id, (err, oneTripFromDB) => {
            db.Trip.find({}, (err, allTripsFromDB) => {
                if (err) {
                    console.log(err);
                } else if (selectedCategory === 'edit') {
                    const context = {
                        oneTrip: oneTripFromDB,
                        selectedCategory: selectedCategory,
                        allTrips: allTripsFromDB,
                    }
                    res.render('trip/show', context)
                }
            })
        })
        db.Trip.findById(req.params.id, (err, oneTripFromDB) => {
            db.Trip.find({}, (err, allTripsFromDB) => {
                if(err){
                    console.log(err);

                } else if( selectedCategory === 'itinerary') {
                    db.Itinerary.find({}, (err, foundEvents) => {
                        if(err) {
                            console.log(err);
                        } else {
                            res.render('trip/show', {
                                events: foundEvents, 
                                oneTrip: oneTripFromDB,
                                selectedCategory: selectedCategory,
                                allTrips: allTripsFromDB,
                            })
                        }
                    })

                } else if( selectedCategory === 'notes') {
                    db.Note.find({}, (err, foundNotes) => {
                        if(err) {
                            console.log(err);
                        } else {
                            res.render('trip/show', {
                                notes: foundNotes, 
                                oneTrip: oneTripFromDB,
                                selectedCategory: selectedCategory,
                                allTrips: allTripsFromDB,
                            })
                        }
                    })

                } else if( selectedCategory === 'arrivals') {
                    db.Flight.find({}, (err, foundArrivals) => {
                        if(err) {
                            console.log(err);
                        } else {
                            res.render('trip/show', {
                                arrivals: foundArrivals, 
                                oneTrip: oneTripFromDB,
                                selectedCategory: selectedCategory,
                                allTrips: allTripsFromDB,
                            })
                        }
                    })

                } else if( selectedCategory === 'departures') {
                    db.Flight.find({}, (err, foundDepartures) => {
                        if(err) {
                            console.log(err);
                        } else {
                            res.render('trip/show', {
                                departures: foundDepartures, 
                                oneTrip: oneTripFromDB,
                                selectedCategory: selectedCategory,
                                allTrips: allTripsFromDB,
                            })
                        }
                    })

                } else {
                    const context = {
                        selectedCategory: selectedCategory,
                        oneTrip: oneTripFromDB,
                        allTrips: allTripsFromDB
                    }
                    res.render('trip/show', context)
                }}
                )
            })
    } catch (err) {
            res.send(({ message: 'Internal Server Error through Show Route', err: err }))
            }
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
router.get('/:id', function (req,res) {
    db.Trip.findById(req.params.id, (err, oneTripFromDB) => {
        db.Trip.find({}, (err, allTripsFromDB) => {
            if (err) {
                console.log(err);
            } else {
                const context = {
                    oneTrip: oneTripFromDB,
                    allTrips: allTripsFromDB,
                }
                res.render('trip/show', context)
            }
        })
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


