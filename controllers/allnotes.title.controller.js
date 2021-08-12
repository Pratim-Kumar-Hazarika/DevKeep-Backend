const { ArchiveNote } = require("../models/archive.notes.model")
const { Note } = require("../models/notes.model")
const { PinnedNote } = require("../models/pinned.notes.model")

exports.update_notes_title = async (req, res) => {
    try {
        const {decodedValues} = req.user
        await Note.updateOne({ "_id": decodedValues.userId, "notes._id": req.body.noteId }, {
        "$set": {
          "notes.$.title": req.body.newTitle,
        }
      }, { upsert: true })
      res.json({ success: true, message: "Title updated sucessfully" })
    } catch{
      res.status(500).json({ success: false, message: "Error while updating the title " })
    }
  }

  exports.update_pinned_notes_title = async (req, res) => {
    try {
        const {decodedValues} = req.user
        await PinnedNote.updateOne({ "_id": decodedValues.userId, "pinnedNotes._id": req.body.noteId }, {
        "$set": {
          "pinnedNotes.$.title": req.body.newTitle,
        }
      }, { upsert: true })
      res.json({ success: true, message: "Pinned Note title updated sucessfully" })
    } catch{
      res.status(500).json({ success: false, message: "Error while updating the title of pinned Note" })
    }
  }

  exports.update_archive_notes_title = async (req, res) => {
    try {
        const {decodedValues} = req.user
        await ArchiveNote.updateOne({ "_id": decodedValues.userId, "archiveNotes._id": req.body.noteId }, {
        "$set": {
          "archiveNotes.$.title": req.body.newTitle,
        }
      }, { upsert: true })
      res.json({ success: true, message: "Archived Note title updated sucessfully" })
    } catch{
      res.status(500).json({ success: false, message: "Error while updating the title of archived Note" })
    }
  }