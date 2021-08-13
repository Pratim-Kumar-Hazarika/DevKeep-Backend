const mongoose = require("mongoose");
const {Schema} = mongoose;

 const labelSchema = new Schema({
    labelName:String,
    _id :{ type: mongoose.Schema.Types.ObjectId },
})
const imageSchema = new Schema({
    imageUrl:String,
    _id :{ type: mongoose.Schema.Types.ObjectId, auto: true },
})

 const noteSchema = new Schema({
    _id :{ type: mongoose.Schema.Types.ObjectId, auto: true },
    images: [imageSchema],
    title:String,
    description:String,
    label :[labelSchema],
    color:String,
  })
  module.exports = { noteSchema}