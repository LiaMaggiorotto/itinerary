const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    guest: { type: String, required: true },
    airline: String,
    departureCity: { type: String, required: true},
    departureDate: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalCity: { type: String, required: true },
    arrivalDate: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    category: { type: String, required: true },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User",  required: true},
})

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;