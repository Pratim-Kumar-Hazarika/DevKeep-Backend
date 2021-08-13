const { ArchiveNote } = require("../models/archive.notes.model")
const { Note } = require("../models/notes.model")
const { PinnedNote } = require("../models/pinned.notes.model")
const { cloudinary} = require("../cloudinary/cloudinary");

exports.delete_image_from_notes = async (req, res) => {
    try {
        const {decodedValues} = req.user
        await Note.updateOne({ "_id": decodedValues.userId, "notes._id": req.body.noteId }, {
            "$pull": {
                "notes.$.images": {"_id":req.body.imageId}, 
              }
      }, { upsert: true })
      res.json({ success: true, message: "Image deleted sucessfully" })
    } catch{
      res.status(500).json({ success: false, message: "Error while deleting the image " })
    }
  }

  exports.add_image_to_pinned_notes = async (req, res) => {
    try {
        const {decodedValues} = req.user
        await PinnedNote.updateOne({ "_id": decodedValues.userId, "pinnedNotes._id": req.body.noteId }, {
        "$pull": {
          "pinnedNotes.$.images": {"_id":req.body.imageId},
        }
      }, { upsert: true })
      res.json({ success: true, message: "Image deleted successfully from pinned notes" })
    } catch{
      res.status(500).json({ success: false, message: "Error while deleting the image from pinned note" })
    }
  }

  exports.add_image_to_archive_note = async (req, res) => {
    try {
        const {decodedValues} = req.user;
         const image = req.body.image;
        const uplodedResponse = await cloudinary.uploader.upload(image,{
          upload_preset:"dev_setups"
        })
        await ArchiveNote.updateOne({ "_id": decodedValues.userId, "archiveNotes._id": req.body.noteId }, {
        "$pull": {
          "archiveNotes.$.images": {"_id":req.body.imageId},
        }
      }, { upsert: true })
      res.json({ success: true, message: "Image deleted successfully from archive note" })
    } catch{
      res.status(500).json({ success: false, message: "Error while deleting the image from archive note" })
    }
  }