// --------------------- External Modules
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


// --------------------- Internal Modules
const db = require('./models');
const controllers = require('./controllers');



// --------------------- Instanced Modules
const app = express();


// --------------------- Configuration
const PORT = 3000;
app.set('view engine', 'ejs');


// --------------------- Middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.use(session({
    resave: false,
    saveUninitialized: false, 
    secret: "As if!", 
    store: new MongoStore({
      url: 'mongodb://localhost:27017/itinerary',
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2 
      }
    }));

// const authRequired = (req, res, next) => {
//     if(!req.session.currentUser) {
//         console.log('no current user found')
//         return res.redirect('/');
//     }
//     next();
// }

app.use(function(req, res, next) {
    res.locals.user = req.session.currentUser;
    next();
  });


// --------------------- Routes

// View Routes

// home
app.get('/', function (req, res)  {
    res.render('index', { user: req.session.currentUser });
});

//  Auth Routes
app.use('/', controllers.auth);


// User Routes
app.use('/user', controllers.users);


// Trip Routes
app.use('/trips', controllers.trips);

// Trip Details
app.use('/tripdetail', controllers.tripDetails);


// --------------------- Server Listener
app.listen(PORT, () => {
    console.log(`Listening for client request on ${PORT}`)
});