// base route is /auth
const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");



// register form
router.get("/register", function(req, res) {
    res.render("register");
});


// login form
router.get("/login", function(req, res) {
    res.render("login");
});


// register post
router.post("/register", async function(req, res) {
    console.log("form data:", req.body);
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });
        if(foundUser) {
            return res.send({ message: "An account with this email is already registered" });
        }
        const newUser = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        newUser.password = hash;
        const createdUser = await db.User.create(newUser);
        req.session.currentUser = {
            username: createdUser.username,
            id: createdUser._id,
        }
        res.redirect(`/${createdUser._id}/account`);
    } catch (error) {
        console.log(error);
        res.send({ message: "Internal Server Error", err: error });
    }
});


// login post
router.post("/login", async function(req, res) {
    console.log("form data:", req.body);
    try {
        const foundUser = await db.User.findOne({ userName: req.body.userName });
        if(!foundUser) {
            return res.send({ message: "Incorrect Username or Password" });
        }
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if(!match) {
            return res.send({ message: "Incorrect Username or Password" });
        }
        req.session.currentUser = {
            username: foundUser.username,
            id: foundUser._id,
        }
        res.redirect(`/${foundUser._id}/account`)
    } catch (error) {
        res.send({ message: "Internal Server Error", err: error });
    }
})


// logout delete 
router.delete("/logout", async (req, res) => {
    await req.session.destroy();
    res.redirect("/")
});


module.exports = router;


module.exports.authRequired = (req, res, next) => {
          if(!req || !req.session || (req.session.cookie['_expires'] - new Date()) < 0) {
            return res.redirect("/login");
          }
          next();
}


module.exports.isCorrectUser = (req, res, next) => {
    if(req && req.session && req.session.currentUser && req.session.currentUser.id === req.params.id){
        next();
    } else {
        res.status(403).json({error: 'Not today, bae'});
    }
}