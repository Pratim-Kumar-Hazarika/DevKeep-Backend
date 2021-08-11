const mongoose = require("mongoose");
const { noteSchema } = require("../Schema/notes.schema");
const {Schema} = mongoose;

 const userNotes = new Schema({
    _id:{
      type :mongoose.Schema.Types.ObjectId,
      ref :"User",
      required:true
    },
    notes:[noteSchema]
  })
const Note = mongoose.model("Note", userNotes);

module.exports = { Note }