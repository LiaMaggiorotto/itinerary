const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    imageLink: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    trip: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Trip",
    }]
}
{
    timestamps: true,
} 
);

const User = mongoose.model("User", userSchema);

module.exports = User;
