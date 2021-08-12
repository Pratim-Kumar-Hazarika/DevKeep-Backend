const { Label } = require("../models/label.model")
const { Note } = require("../models/notes.model")

exports.get_all_labels = async(req,res)=>{
    try {
        const {decodedValues} = req.user
        const getLables = await Label.findById(decodedValues.userId)
        res.json({message:"All the lables are",getLables})
    } catch (error) {
        res.status(500).json({errorMessage:"Error while getting the labels of the user"})
    }
}

exports.add_new_label = async(req,res)=>{
    try {
        const {decodedValues} = req.user;
        const getUserLabels = await Label.findById(decodedValues.userId)
        if(getUserLabels === null){
            const AddNewLabel = new Label({
              _id : decodedValues.userId,
              labels:[req.body]
            })
            await AddNewLabel.save()
            return res.json({success:true,message:"Label added sucessfully"})
          }
          await Label.updateOne({"_id":decodedValues.userId},{
            "$addToSet":{
              "labels":req.body
            }
          })
          return res.json({success:true,message:"Label Added Successfully"})
    } catch (error) {
        res.status(500).json({errorMessage:"Error occured while adding the label"})
    }
}

exports.edit_label  = async (req, res) => {
    try {
        const {decodedValues} = req.user
        await Label.updateOne({ "_id": decodedValues.userId, "labels._id": req.body.labelId }, {
        "$set": {
          "labels.$.labelName": req.body.newLabel,
        }
      }, { upsert: true })
      await Note.updateMany({ "_id":  decodedValues.userId}, {
        "$set": {
          "notes.$[].label.$[elem].labelName":req.body.newLabel
        }},
        { "arrayFilters": [ { "elem._id": req.body.labelId } ] , multi: true} 
      )
      res.json({ success: true, message: "Label updated sucessfully" })
    } catch{
      res.status(500).json({ success: false, message: "Error while updating the label " })
    }
  }

  exports.delete_label = async(req,res)=>{
      try {
        const {decodedValues} = req.user
        await Label.updateOne({"_id":decodedValues.userId},
        {"$pull":
          {"labels":
              {"_id":req.body.labelId}
          }})
          res.json({message:"Label deleted successfully"})
      } catch (error) {
          res.status(500).json({errorMessage:"Label not deleted"})
      }
  }