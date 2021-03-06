const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    destination: { type: String, required: true },
    imageLink: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    details: String,
    flights: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Flight",
    }],
    itinerary: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Itinerary",
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Note",
    }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"}, 
})

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;