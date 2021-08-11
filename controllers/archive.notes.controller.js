const { ArchiveNote } = require("../models/archive.notes.model");

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