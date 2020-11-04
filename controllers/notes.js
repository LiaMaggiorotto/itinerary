const express = require('express');
const router = express.Router();

const db = require("../models");

// base route is /trips

// --------------------- Create 
router.post('/:id', function (req, res) {
    console.log(req.body);
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
})


// --------------------- Edit


// --------------------- Update


// --------------------- Delete



module.exports = router;