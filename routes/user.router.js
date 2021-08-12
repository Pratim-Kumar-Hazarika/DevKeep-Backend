const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user.controller");
const UserNotesController = require("../controllers/note.controller")
const UserPinnedNotesController = require("../controllers/pinned.notes.controller")
const UserArchiveNotesController = require("../controllers/archive.notes.controller")
const UserTrashNotesController = require("../controllers/trash.controller")
const ColorController = require("../controllers/color.controller")
const LabelController = require("../controllers/label.controller")
const {userLogger} = require("../middlewares/authHandler");
const { ArchiveNote } = require('../models/archive.notes.model');
const { Note } = require('../models/notes.model');
const { PinnedNote } = require('../models/pinned.notes.model');
const { Trash } = require('../models/trash.model');
const { Label} = require("../models/label.model")

router.route("/")
.get(UserController.get_all_users)
.post(UserController.add_user)

router.route("/login")
.post(UserController.user_login)

router.use(userLogger)


///Labels
router.route("/labels")
.get(LabelController.get_all_labels) // get all lables
.post(LabelController.add_new_label) // add labels

router.route("/labels/edit")
.post(LabelController.edit_label )// Left -> edit lables from all notes also

router.route("/labels/delete")
.post(LabelController.delete_label) // Left -> delete lables from all notes also


//NOTES
router.route("/notes")
.get(UserNotesController.get_user_note) // get all notes
.post(UserNotesController.add_note_from_input) // from input

router.route("/notes/pinned")
.post(UserNotesController.add_note_to_pinnedNotes) // pin note

router.route("/notes/archive")
.post(UserNotesController.archive_note) // archive

router.route("/notes/delete")
.post(UserNotesController.delete_note_from_notes) // trash

router.route("/notes/color")
.post(ColorController.change_notes_bg_color) //color

router.route("/notes/label")
.post(UserNotesController.add_label_to_notes) //add label

router.route("/notes/label/delete")
.post(UserNotesController.delete_label_from_note) // delete label



//PINNED NOTES
router.route("/pinnedNote")
.get(UserPinnedNotesController.get_pinned_notes) // get all pinned notes
.post(UserPinnedNotesController.add_to_pinned_note_from_input) //from input

router.route("/pinnedNote/note")
.post(UserPinnedNotesController.add_pinnedNote_to_note) //unpin note

router.route("/pinnedNote/delete")
.post(UserPinnedNotesController.delete_note_from_pinnedNotes) //trash

router.route("/pinnedNote/archive")
.post(UserPinnedNotesController.archive_pinned_note) // archive

router.route("/pinnedNote/color")
.post(ColorController.change_pinned_notes_bg_color) // color

router.route("/pinnedNote/label")
.post(UserPinnedNotesController.add_label_to_pinned_notes) //add label

router.route("/pinnedNote/label/delete")
.post(UserPinnedNotesController.delete_label_from_pinned_note) // delete label




///ARCHIVE NOTES
router.route("/archiveNote")
.get(UserArchiveNotesController.get_archive_note) // get all archive notes
.post(UserArchiveNotesController.add_to_archive_note_from_input); // from input

router.route("/archiveNote/pinned")
.post(UserArchiveNotesController.pin_archive_note) // pin archived note

router.route("/archiveNote/note")
.post(UserArchiveNotesController.unarchive_note) // unarchive 

router.route("/archiveNote/delete")
.post(UserArchiveNotesController.delete_archive_note) // trash

router.route("/archiveNote/color")
.post(ColorController.change_archive_notes_bg_color) // color

router.route("/archiveNote/label")
.post(UserArchiveNotesController.add_label_to_archive_notes) //add label

router.route("/archiveNote/label/delete")
.post(UserArchiveNotesController.delete_label_from_archive_note) // delete label



////TRASH NOTES
router.route("/trash/delete")
.post(UserTrashNotesController.delete_note_forever) // delete forever

router.route("/trash/restore")
.post(UserTrashNotesController.restore_note) //restore (sent to notes )


module.exports = router;