const { ArchiveNote } = require("../models/archive.notes.model")
const { Note } = require("../models/notes.model")
const { PinnedNote } = require("../models/pinned.notes.model")

exports.update_notes_description = async (req, res) => {
    try {
        const {decodedValues} = req.user
        await Note.updateOne({ "_id": decodedValues.userId, "notes._id": req.body.noteId }, {
        "$set": {
          "notes.$.description": req.body.newDescription,
        }
      }, { upsert: true })
      res.json({ success: true, message: "description updated sucessfully" })
    } catch{
      res.status(500).json({ success: false, message: "Error while updating the description " })
    }
  }

  exports.update_pinned_notes_description = async (req, res) => {
    try {
        const {decodedValues} = req.user
        await PinnedNote.updateOne({ "_id": decodedValues.userId, "pinnedNotes._id": req.body.noteId }, {
        "$set": {
          "pinnedNotes.$.description": req.body.newDescription,
        }
      }, { upsert: true })
      res.json({ success: true, message: "Pinned Note description updated sucessfully" })
    } catch{
      res.status(500).json({ success: false, message: "Error while updating the description of pinned Note" })
    }
  }

  exports.update_archive_notes_description = async (req, res) => {
    try {
        const {decodedValues} = req.user
        await ArchiveNote.updateOne({ "_id": decodedValues.userId, "archiveNotes._id": req.body.noteId }, {
        "$set": {
          "archiveNotes.$.description": req.body.newDescription,
        }
      }, { upsert: true })
      res.json({ success: true, message: "Archived Note description updated sucessfully" })
    } catch{
      res.status(500).json({ success: false, message: "Error while updating the description of archived Note" })
    }
  }