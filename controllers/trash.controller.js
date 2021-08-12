const { Note } = require("../models/notes.model");
const { Trash } = require("../models/trash.model");

exports.delete_note_forever = async(req,res)=>{
    const {decodedValues} = req.user;
    try {
        await Trash.updateOne({"_id":decodedValues.userId},
        {"$pull":
          {"trashNotes":
              {"_id":req.body.noteId}
          }})
      res.json({success:true,message:"note deleted forever"})
    } catch (error) {
        res.status(500).json({errorMessage:"Note not deleted"})
    }   
}

exports.restore_note = async(req,res)=>{
    try {
    const {decodedValues} = req.user;
    const getNotesOfUser = await Trash.findById(decodedValues.userId)
     const filterNote = getNotesOfUser.trashNotes.filter((note)=>note._id == req.body.noteId)
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
      await Trash.updateOne({"_id":decodedValues.userId},
      {"$pull":
        {"trashNotes":
            {"_id":req.body.noteId}
        }})
      return res.json({success:true,message:"note restored sucessfully"})
    } catch (error) {
        res.status(500).json({errorMessage:"error while restoring the note"})
    }
  }