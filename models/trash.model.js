const mongoose = require("mongoose");
const { noteSchema } = require("../Schema/notes.schema");
const {Schema} = mongoose;

 const userTrash = new Schema({
    _id:{
      type :mongoose.Schema.Types.ObjectId,
      ref :"User",
      required:true
    },
    trashNotes:[noteSchema]
  })
const Trash = mongoose.model("Trash", userTrash);

module.exports = { Trash }