const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String },
    description: { type: String },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User",  required: true},
},
{
    timestamps: true
}
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;