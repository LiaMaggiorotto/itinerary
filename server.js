// --------------------- External Modules
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');


// --------------------- Internal Modules
// const controllers = require("./controllers");
const db = require('./models/index');


// --------------------- Instanced Modules
const app = express();


// --------------------- Configuration
const PORT = 3000;
app.set("view engine", "ejs");


// --------------------- Middleware
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});


// --------------------- Routes

// view, home page
app.get("/", function (req, res)  {
    res.render("index", {});
});


// --------------------- Server Listener
app.listen(PORT, () => {
    console.log(`Listening for client request on ${PORT}`)
});