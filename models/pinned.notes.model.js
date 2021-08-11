const mongoose = require("mongoose");
const { noteSchema } = require("../Schema/notes.schema");
const {Schema} = mongoose;

 const userPinnedNotes = new Schema({
    _id:{
      type :mongoose.Schema.Types.ObjectId,
      ref :"User",
      required:true
    },
    pinnedNotes:[noteSchema]
  })
const PinnedNote = mongoose.model("PinnedNote", userPinnedNotes);

module.exports = { PinnedNote }