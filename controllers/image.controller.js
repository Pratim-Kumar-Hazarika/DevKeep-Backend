const { ArchiveNote } = require("../models/archive.notes.model")
const { Note } = require("../models/notes.model")
const { PinnedNote } = require("../models/pinned.notes.model")
const { cloudinary} = require("../cloudinary/cloudinary");
// uplodedResponse.secure_url
exports.add_image_to_notes = async (req, res) => {
    try {
        const {decodedValues} = req.user
        // const image = req.body.image;
        // const uplodedResponse = await cloudinary.uploader.upload(image,{
        //   upload_preset:"dev_setups"
        // })
        await Note.updateOne({ "_id": decodedValues.userId, "notes._id": req.body.noteId }, {
          "$addToSet": {
            "notes.$.images": {"imageUrl":req.body.imageUrl}, 
          }
      }, { upsert: true })
      res.json({ success: true, message: "Image uploded sucessfully" })
    } catch{
      res.status(500).json({ success: false, message: "Error while uploding the image " })
    }
  }

  exports.add_image_to_pinned_notes = async (req, res) => {
    try {
        const {decodedValues} = req.user
           // const image = req.body.image;
        // const uplodedResponse = await cloudinary.uploader.upload(image,{
        //   upload_preset:"dev_setups"
        // })
        await PinnedNote.updateOne({ "_id": decodedValues.userId, "pinnedNotes._id": req.body.noteId }, {
        "$addToSet": {
          "pinnedNotes.$.images": {"imageUrl":req.body.imageUrl},
        }
      }, { upsert: true })
      res.json({ success: true, message: "Image uploded sucessfully to pinned notes" })
    } catch{
      res.status(500).json({ success: false, message: "Error while uploding the image to pinned notes" })
    }
  }

  exports.add_image_to_archive_note = async (req, res) => {
    try {
        const {decodedValues} = req.user;
         // const image = req.body.image;
        // const uplodedResponse = await cloudinary.uploader.upload(image,{
        //   upload_preset:"dev_setups"
        // })
        await ArchiveNote.updateOne({ "_id": decodedValues.userId, "archiveNotes._id": req.body.noteId }, {
        "$addToSet": {
          "archiveNotes.$.images": {"imageUrl":req.body.imageUrl},
        }
      }, { upsert: true })
      res.json({ success: true, message: "Image uplod sucessfully to archive note" })
    } catch{
      res.status(500).json({ success: false, message: "Error while uploding the image to archive note" })
    }
  }