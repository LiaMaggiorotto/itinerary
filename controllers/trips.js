const express = require('express');
const router = express.Router();

const db = require('../models');

// base route is /trips

const eventCategories = ['Dining', 'Entertainment', 'Travel', 'Fitness', 'Check In', 'Check Out', 'Leisure', 'Tour'];

const flightCategory = ['Arrival', 'Departure'];

// --------------------- Index View 
router.get('/', (req,res) => {
    db.Trip.find({user: req.session.currentUser.id}, (err, allTripsFromDB) => {
        if(err) {
            console.log(err);
        } else {
            res.render('trip/tripsIndex', {
                allTrips: allTripsFromDB,
                eventCategories: eventCategories,
                flightCategory: flightCategory,
            });
        }
    });
});


// --------------------- New 
router.get('/newtrip', function (req, res) {
        const allTrips = db.Trip.find({});
        const context = {
           allTrips: allTrips,
        }
        res.render('trip/new', context);
});


// --------------------- Create 
router.post('/', function (req, res) {
    req.body.user = req.session.currentUser.id
    db.Trip.create(req.body, function (err, createdTripInDB) {
        if(err) {
            console.log(err);
        } else {
            db.User.findById(req.session.currentUser.id, function (err, foundUser) {
                foundUser.trips.push(createdTripInDB._id)
                foundUser.save()
                console.log(req.body);
                console.log(createdTripInDB);
                res.redirect(`/trips/${createdTripInDB._id}`)
            })
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
                        eventCategories: eventCategories,
                        flightCategory: flightCategory,
                    }
                    res.render('trip/show', context)
                }
            })
        })
        db.Trip.findById(req.params.id).populate('itinerary notes flights').exec( (err, oneTripFromDB) => {
            db.Trip.find({}, (err, allTripsFromDB) => {
                if(err){
                    console.log(err);
                } else {
                    const context = {
                        selectedCategory: selectedCategory,
                        oneTrip: oneTripFromDB,
                        allTrips: allTripsFromDB,
                        eventCategories: eventCategories,
                        flightCategory: flightCategory,
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
    req.body.user = req.session.currentUser.id
    db.Trip.findByIdAndDelete(req.params.id, (err, oneTripFromDB) => {
    if(err) {
        console.log(err);
    } else {
        console.log(oneTripFromDB);
        res.redirect(`/user/${req.body.user}`);
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


