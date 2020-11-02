
const express = require('express');
const router = express.Router();

const db = require('../models');
const {isCorrectUser} = require('./auth');

// base route is /user

// view register/login modals
router.get('/', function (req, res) {
    res.render('index');
});


// show, individual user account view
router.get('/:id', isCorrectUser, async function (req, res) {
    try {
        const user = await db.User.findById(req.params.id)
        .populate('trips')
        .exec();
        console.log(user);
            res.render('users/account', { user: user });
    } catch (err) {
        return res.json(err);
    }
});

// edit <- view, edit individual user profile page
router.get('/:id/edit', isCorrectUser, async function (req, res) {
    try {
        const user = await db.User.findById(req.params.id);
        res.render("users/edit", { user: user });
    } catch (err) {
        return res.json(err);
    }
});

// update <- db change to user profile
router.put('/:id', function (req, res) {
    db.User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (
    err,
    updatedUser
    ) {
    if (err) {
        console.log(err);
        return res.send(err);
    }
    res.redirect(`/${updatedUser._id}`);
    });
});

  // delete <- delete profile route
router.delete("/:id", function (req, res) {
    db.User.findByIdAndDelete(req.params.id, function (err, deletedUser) {
        console.log(deletedUser);
        if (err) {
            console.log(err);
            return res.send(err);
        }
    });
    req.session.destroy(()=> res.redirect('/'));
});

module.exports = router;
