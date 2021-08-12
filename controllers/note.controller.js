const { ArchiveNote } = require("../models/archive.notes.model");
const { Note } = require("../models/notes.model");
const { PinnedNote } = require("../models/pinned.notes.model");
const { Trash } = require("../models/trash.model");

exports.get_user_note = async(req,res)=>{
    try {
        const {decodedValues} = req.user
        const getUserNotes = await Note.findById(decodedValues.userId)
        res.json({message:"user notes are",getUserNotes})
    } catch (error) {
        res.status(500).json({errorMessage:"error occured while getting user notes"})
    }
}

exports.add_note_from_input = async(req,res)=>{
    try {
        const {decodedValues} = req.user;
        const getUserNotes = await Note.findById(decodedValues.userId)
        if(getUserNotes === null){
            const AddNewNote = new Note({
              _id : decodedValues.userId,
              notes:[req.body]
            })
            await AddNewNote.save()
            return res.json({success:true,message:"Note added sucessfully"})
          }
          await Note.updateOne({"_id":decodedValues.userId},{
            "$addToSet":{
              "notes":req.body
            }
          })
          return res.json({success:true,message:"Note Added Successfully"})
    } catch (error) {
        res.status(500).json({errorMessage:"error occured while adding the note"})
    }
}

exports.add_note_to_pinnedNotes = async(req,res)=>{
  try {
    const {decodedValues} = req.user;
    const getNotesOfUser = await Note.findById(decodedValues.userId)
   const filterNote = getNotesOfUser.notes.filter((note)=>note._id == req.body.noteId)
   const checkPinnedNote = await PinnedNote.findById(decodedValues.userId)
   if(checkPinnedNote === null){
    const AddNewNote = new PinnedNote({
      _id : decodedValues.userId,
      pinnedNotes:[filterNote[0]]
    })
      await AddNewNote.save()
      await Note.updateOne({"_id":decodedValues.userId},
            {"$pull":
              {"notes":
                  {"_id":req.body.noteId}
              }})
      return res.json({success:true,message:"note added sucessfully to pinnnedNote[]"})
    }
    await PinnedNote.updateOne({"_id":decodedValues.userId},{
      "$addToSet":{
        "pinnedNotes":filterNote[0]
      }
    })
    await Note.updateOne({"_id":decodedValues.userId},
    {"$pull":
      {"notes":
          {"_id":req.body.noteId}
      }})
    return res.json({success:true,message:"note added sucessfully to pinnnedNote[]"})

  } catch (error) {
      res.status(500).json({errorMessage:"note not added to pinnnedNote[]"})
  }
}

exports.delete_note_from_notes =  async(req,res)=>{
  try {
    const {decodedValues} = req.user;
    const getNotesOfUser = await Note.findById(decodedValues.userId)
   const filterNote = getNotesOfUser.notes.filter((note)=>note._id == req.body.noteId)
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
    await Note.updateOne({"_id":decodedValues.userId},
    {"$pull":
      {"notes":
          {"_id":req.body.noteId}
      }})
    return res.json({success:true,message:"note deleted successfully"})

  } catch (error) {
      res.status(500).json({errorMessage:"error while deleting note"})
  }
}

exports.archive_note = async(req,res)=>{
  try {
    const {decodedValues} = req.user;
    const getNotesOfUser = await Note.findById(decodedValues.userId)
   const filterNote = getNotesOfUser.notes.filter((note)=>note._id == req.body.noteId)
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
    await Note.updateOne({"_id":decodedValues.userId},
    {"$pull":
      {"notes":
          {"_id":req.body.noteId}
      }})
    return res.json({success:true,message:"note archived sucessfully"})

  } catch (error) {
      res.status(500).json({errorMessage:"error while archiving the note"})
  }
}


exports.add_label_to_notes = async(req,res)=>{
  try {
    const {decodedValues} = req.user;
    await Note.updateOne({ "_id": decodedValues.userId, "notes._id": req.body.noteId }, {
      "$addToSet": {
        "notes.$.label": req.body, 
      }
    })
      res.json({message:"Label added sucessfully to notes"})
  } catch (error) {
      res.status(500).json({errorMessage:"error occured while adding the label to the note"})
  }
}

exports.delete_label_from_note = async(req,res)=>{
  try {
    const {decodedValues} = req.user;
    await Note.updateOne({ "_id": decodedValues.userId, "notes._id": req.body.noteId }, {
      "$pull": {
        "notes.$.label": {"_id":req.body.labelId}, 
      }
    }, { upsert: true })
      res.json({message:"Label removed sucessfully from notes"})
  } catch (error) {
      res.status(500).json({errorMessage:"error occured while removing the label to the note"})
  }
}
