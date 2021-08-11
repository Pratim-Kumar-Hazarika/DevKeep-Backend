const { Note } = require("../models/notes.model");
const { PinnedNote } = require("../models/pinned.notes.model");

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
      await PinnedNote.updateOne({"_id":decodedValues.userId},
            {"$pull":
              {"pinnedNotes":
                  {"_id":req.body.noteId}
              }})
      return res.json({success:true,message:"pinnednote added to notes array"})
    }
    await Note.updateOne({"_id":decodedValues.userId},{
      "$addToSet":{
        "notes":filterNote[0]
      }
    })
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