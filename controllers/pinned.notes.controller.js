const { ArchiveNote } = require("../models/archive.notes.model");
const { Note } = require("../models/notes.model");
const { PinnedNote } = require("../models/pinned.notes.model");
const { Trash } = require("../models/trash.model");

exports.get_pinned_notes = async(req,res)=>{
    try {
        const {decodedValues} = req.user
        const getUserNotes = await PinnedNote.findById(decodedValues.userId)
        res.json({message:"user PinnedNotes are",getUserNotes})
    } catch (error) {
        res.status(500).json({errorMessage:"error occured while getting user notes"})
    }
}

exports.add_to_pinned_note_from_input = async(req,res)=>{
    try {
        const {decodedValues} = req.user;
        const getUserNotes = await PinnedNote.findById(decodedValues.userId)
        if(getUserNotes === null){
            const AddNewNote = new PinnedNote({
              _id : decodedValues.userId,
              pinnedNotes:[req.body]
            })
            await AddNewNote.save()
            return res.json({success:true,message:"PinnedNote added sucessfully"})
          }
          await PinnedNote.updateOne({"_id":decodedValues.userId},{
            "$addToSet":{
              "pinnedNotes":req.body
            }
          })
          return res.json({success:true,message:"PinnedNote Added Successfully"})
    } catch (error) {
        res.status(500).json({errorMessage:"error occured while adding the note"})
    }
}
exports.add_pinnedNote_to_note = async(req,res)=>{
  try {
    const {decodedValues} = req.user;
    const getNotesOfUser = await PinnedNote.findById(decodedValues.userId)
   const filterNote = getNotesOfUser.pinnedNotes.filter((note)=>note._id == req.body.noteId)
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
    await PinnedNote.updateOne({"_id":decodedValues.userId},
    {"$pull":
      {"pinnedNotes":
          {"_id":req.body.noteId}
      }})
    return res.json({success:true,message:"pinneNote added to notes []"})

  } catch (error) {
      res.status(500).json({errorMessage:"pinned note not added to notes[]"})
  }
}

exports.delete_note_from_pinnedNotes = async(req,res)=>{
  try {
    const {decodedValues} = req.user;
    const getNotesOfUser = await PinnedNote.findById(decodedValues.userId)
   const filterNote = getNotesOfUser.pinnedNotes.filter((note)=>note._id == req.body.noteId)
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
    await PinnedNote.updateOne({"_id":decodedValues.userId},
    {"$pull":
      {"pinnedNotes":
          {"_id":req.body.noteId}
      }})
    return res.json({success:true,message:"note deleted successfully from pinnedNote"})

  } catch (error) {
      res.status(500).json({errorMessage:"error while deleting note from pinnedNote"})
  }
}

exports.archive_pinned_note = async(req,res)=>{
  try {
    const {decodedValues} = req.user;
    const getNotesOfUser = await PinnedNote.findById(decodedValues.userId)
   const filterNote = getNotesOfUser.pinnedNotes.filter((note)=>note._id == req.body.noteId)
   const checkPinnedNote = await ArchiveNote.findById(decodedValues.userId)
   if(checkPinnedNote === null){
    const AddNewNote = new ArchiveNote({
      _id : decodedValues.userId,
      archiveNotes:[filterNote[0]]
    })
      await AddNewNote.save()
    }else{
      await ArchiveNote.updateOne({"_id":decodedValues.userId},{
        "$addToSet":{
          "archiveNotes":filterNote[0]
        }
      })
    }
    await PinnedNote.updateOne({"_id":decodedValues.userId},
    {"$pull":
      {"pinnedNotes":
          {"_id":req.body.noteId}
      }})
    return res.json({success:true,message:"pinned note archived sucessfully"})

  } catch (error) {
      res.status(500).json({errorMessage:"error while archiving the pinned note"})
  }
}

exports.add_label_to_pinned_notes = async(req,res)=>{
  try {
    const {decodedValues} = req.user;
    await PinnedNote.updateOne({ "_id": decodedValues.userId, "pinnedNotes._id": req.body.noteId }, {
      "$addToSet": {
        "pinnedNotes.$.label": req.body, 
      }
    })
      res.json({message:"Label added sucessfully to pinned notes"})
  } catch (error) {
      res.status(500).json({errorMessage:"error occured while adding the label to the pinned note"})
  }
}

exports.delete_label_from_pinned_note = async(req,res)=>{
  try {
    const {decodedValues} = req.user;
    await PinnedNote.updateOne({ "_id": decodedValues.userId, "pinnedNotes._id": req.body.noteId }, {
      "$pull": {
        "pinnedNotes.$.label": {"_id":req.body.labelId}, 
      }
    }, { upsert: true })
      res.json({message:"Label removed sucessfully from pinned notes"})
  } catch (error) {
      res.status(500).json({errorMessage:"error occured while removing the label from the pinned note"})
  }
}
