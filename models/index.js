const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/itinerary';

mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    })
    .then(function () {
        console.log('Mongodb connected...');
    })
    .catch(function (err) {
        console.log('Mongodb connection err', err);
    });

mongoose.connection.on('disconnect', function (event) {
    console.log('Mongodb disconnected', event);
});

module.exports = {
    Itinerary: require('./Itinerary'),
    Flight: require('./Flight'),
    Note: require('./Note'),
    User: require('./User'),
}
