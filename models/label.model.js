const mongoose = require("mongoose");
const {Schema} = mongoose;

const labelSchema = new Schema({
    labelName:String,
    _id :{ type: mongoose.Schema.Types.ObjectId, auto: true },
})
 const userArchiveNotes = new Schema({
    _id:{
      type :mongoose.Schema.Types.ObjectId,
      ref :"User",
      required:true
    },
    labels:[labelSchema]
  })

const Label = mongoose.model("Label", userArchiveNotes);

module.exports = { Label }