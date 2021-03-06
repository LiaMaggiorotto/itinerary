const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: String,
    address: String,
    confirmation: String,
    description: String,
    category: String,
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User",  required: true},
})

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;