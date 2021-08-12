const { ArchiveNote } = require("../models/archive.notes.model");
const { Note } = require("../models/notes.model");
const { PinnedNote } = require("../models/pinned.notes.model");
const { Trash } = require("../models/trash.model");

exports.get_archive_note = async(req,res)=>{
    try {
        const {decodedValues} = req.user
        const getUserNotes = await ArchiveNote.findById(decodedValues.userId)
        res.json({message:"user ArchiveNote are",getUserNotes})
    } catch (error) {
        res.status(500).json({errorMessage:"error occured while getting user notes"})
    }
}

exports.add_to_archive_note_from_input = async(req,res)=>{
    try {
        const {decodedValues} = req.user;
        const getUserNotes = await ArchiveNote.findById(decodedValues.userId)
        if(getUserNotes === null){
            const AddNewNote = new ArchiveNote({
              _id : decodedValues.userId,
              archiveNotes:[req.body]
            })
            await AddNewNote.save()
            return res.json({success:true,message:"ArchiveNote added sucessfully"})
          }
          await ArchiveNote.updateOne({"_id":decodedValues.userId},{
            "$addToSet":{
              "archiveNotes":req.body
            }
          })
          return res.json({success:true,message:"ArchiveNote Added Successfully"})
    } catch (error) {
        res.status(500).json({errorMessage:"error occured while adding the note"})
    }
}

exports.pin_archive_note = async(req,res)=>{
  try {
    const {decodedValues} = req.user;
    const getNotesOfUser = await ArchiveNote.findById(decodedValues.userId)
   const filterNote = getNotesOfUser.archiveNotes.filter((note)=>note._id == req.body.noteId)
   const checkPinnedNote = await PinnedNote.findById(decodedValues.userId)
   if(checkPinnedNote === null){
    const AddNewNote = new PinnedNote({
      _id : decodedValues.userId,
      pinnedNotes:[filterNote[0]]
    })
      await AddNewNote.save()
    }else{
      await PinnedNote.updateOne({"_id":decodedValues.userId},{
        "$addToSet":{
          "pinnedNotes":filterNote[0]
        }
      })
    }
    await ArchiveNote.updateOne({"_id":decodedValues.userId},
    {"$pull":
      {"archiveNotes":
          {"_id":req.body.noteId}
      }})
    return res.json({success:true,message:"archive note pinned"})

  } catch (error) {
      res.status(500).json({errorMessage:"archive note not pinned"})
  }
}

exports.unarchive_note = async(req,res)=>{
  try {
  const {decodedValues} = req.user;
  const getNotesOfUser = await ArchiveNote.findById(decodedValues.userId)
   const filterNote = getNotesOfUser.archiveNotes.filter((note)=>note._id == req.body.noteId)
   const checkPinnedNote = await Note.findById(decodedValues.userId)
   if(checkPinnedNote === null){
    const AddNewNote = new Note({
      _id : decodedValues.userId,
      notes:[filterNote[0]]
    })
      await AddNewNote.save()
    }else{
      await Note.updateOne({"_id":decodedValues.userId},{
          "$addToSet":{
            "notes":filterNote[0]
          }
        })
    }
    await ArchiveNote.updateOne({"_id":decodedValues.userId},
    {"$pull":
      {"archiveNotes":
          {"_id":req.body.noteId}
      }})
    return res.json({success:true,message:"note unarchived sucessfully"})
  } catch (error) {
      res.status(500).json({errorMessage:"error while unarchiving the note"})
  }
}

exports.delete_archive_note = async(req,res)=>{
  try {
    const {decodedValues} = req.user;
    const getNotesOfUser = await ArchiveNote.findById(decodedValues.userId)
   const filterNote = getNotesOfUser.archiveNotes.filter((note)=>note._id == req.body.noteId)
   const checkPinnedNote = await Trash.findById(decodedValues.userId)
   if(checkPinnedNote === null){
    const AddNewNote = new Trash({
      _id : decodedValues.userId,
      trashNotes:[filterNote[0]]
    })
      await AddNewNote.save()
    }else{
      await Trash.updateOne({"_id":decodedValues.userId},{
        "$addToSet":{
          "trashNotes":filterNote[0]
        }
      })
    }
    await ArchiveNote.updateOne({"_id":decodedValues.userId},
    {"$pull":
      {"archiveNotes":
          {"_id":req.body.noteId}
      }})
    return res.json({success:true,message:"note deleted successfully from archive"})

  } catch (error) {
      res.status(500).json({errorMessage:"error while deleting note from archive"})
  }
}

exports.add_label_to_archive_notes = async(req,res)=>{
  try {
    const {decodedValues} = req.user;
    await ArchiveNote.updateOne({ "_id": decodedValues.userId, "archiveNotes._id": req.body.noteId }, {
      "$addToSet": {
        "archiveNotes.$.label": req.body, 
      }
    })
      res.json({message:"Label added sucessfully to archive notes"})
  } catch (error) {
      res.status(500).json({errorMessage:"error occured while adding the label to the archive note"})
  }
}

exports.delete_label_from_archive_note = async(req,res)=>{
  try {
    const {decodedValues} = req.user;
    await ArchiveNote.updateOne({ "_id": decodedValues.userId, "archiveNotes._id": req.body.noteId }, {
      "$pull": {
        "archiveNotes.$.label": {"_id":req.body.labelId}, 
      }
    }, { upsert: true })
      res.json({message:"Label removed sucessfully from archived notes"})
  } catch (error) {
      res.status(500).json({errorMessage:"error occured while removing the label from the archived note"})
  }
}
