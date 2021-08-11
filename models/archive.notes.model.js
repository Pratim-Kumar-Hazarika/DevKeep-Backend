const mongoose = require("mongoose");
const { noteSchema } = require("../Schema/notes.schema");
const {Schema} = mongoose;

 const userArchiveNotes = new Schema({
    _id:{
      type :mongoose.Schema.Types.ObjectId,
      ref :"User",
      required:true
    },
    archiveNotes:[noteSchema]
  })
const ArchiveNote = mongoose.model("ArchiveNote", userArchiveNotes);

module.exports = { ArchiveNote }