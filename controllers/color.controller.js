const { ArchiveNote } = require("../models/archive.notes.model")
const { Note } = require("../models/notes.model")
const { PinnedNote } = require("../models/pinned.notes.model")

exports.change_notes_bg_color = async (req, res) => {
    try {
        const {decodedValues} = req.user
        await Note.updateOne({ "_id": decodedValues.userId, "notes._id": req.body.noteId }, {
        "$set": {
          "notes.$.color": req.body.newColor,
        }
      }, { upsert: true })
      res.json({ success: true, message: "Color updated sucessfully" })
    } catch{
      res.status(500).json({ success: false, message: "Error while updating the color " })
    }
  }

  exports.change_pinned_notes_bg_color = async (req, res) => {
    try {
        const {decodedValues} = req.user
        await PinnedNote.updateOne({ "_id": decodedValues.userId, "pinnedNotes._id": req.body.noteId }, {
        "$set": {
          "pinnedNotes.$.color": req.body.newColor,
        }
      }, { upsert: true })
      res.json({ success: true, message: "Pinned Note Color updated sucessfully" })
    } catch{
      res.status(500).json({ success: false, message: "Error while updating the color of pinned Note" })
    }
  }

  exports.change_archive_notes_bg_color = async (req, res) => {
    try {
        const {decodedValues} = req.user
        await ArchiveNote.updateOne({ "_id": decodedValues.userId, "archiveNotes._id": req.body.noteId }, {
        "$set": {
          "archiveNotes.$.color": req.body.newColor,
        }
      }, { upsert: true })
      res.json({ success: true, message: "Archived Note Color updated sucessfully" })
    } catch{
      res.status(500).json({ success: false, message: "Error while updating the color of archived Note" })
    }
  }