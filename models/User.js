const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: String,
    username: { type: String, required: true, unique: true },
    imageLink: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    trips: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Trip",
    }]
}, {
    timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
