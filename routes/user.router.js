const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user.controller");
const UserNotesController = require("../controllers/note.controller")
const UserPinnedNotesController = require("../controllers/pinned.notes.controller")
const UserArchiveNotesController = require("../controllers/archive.notes.controller")
const UserTrashNotesController = require("../controllers/trash.controller")
const ColorController = require("../controllers/color.controller")
const TitleController = require("../controllers/allnotes.title.controller")
const DescriptionController = require("../controllers/allnotes.description.controller")
const LabelController = require("../controllers/label.controller")
const ImageController = require("../controllers/image.controller")
const ImageDeleteController = require("../controllers/image.delete.controller")
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
.post(LabelController.edit_label )// done :edit lables from all notes

router.route("/labels/delete")
.post(LabelController.delete_label) // Left -> delete lables from all notes also


//NOTES
router.route("/notes")
.get(UserNotesController.get_user_note) // get all notes
.post(UserNotesController.add_note_with_image_from_input) // from input +image

router.route("/notes/onlytext")
.post(UserNotesController.add_note_from_input) // from input only text

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

router.route("/notes/title")
.post(TitleController.update_notes_title) // update title

router.route("/notes/description")
.post(DescriptionController.update_notes_description) // update description

router.route("/notes/image")
.post(ImageController.add_image_to_notes) // uplod image

router.route("/notes/image/delete")
.post(ImageDeleteController.delete_image_from_notes) // delete image


//PINNED NOTES
router.route("/pinnedNote")
.get(UserPinnedNotesController.get_pinned_notes) // get all pinned notes
.post(UserPinnedNotesController.add_to_pinned_note_from_input_with_image) //from input text+image

router.route("/pinnedNote/onlytext")
.post(UserPinnedNotesController.add_note_to_pinned_from_input) // from input only text

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

router.route("/pinnedNote/title")
.post(TitleController.update_pinned_notes_title) // update title

router.route("/pinnedNote/description")
.post(DescriptionController.update_pinned_notes_description) // update description


router.route("/pinnedNote/image")
.post(ImageController.add_image_to_pinned_notes) // uplod image

router.route("/pinnedNote/image/delete")
.post(ImageDeleteController.delete_image_from_pinned_note) // delete image




///ARCHIVE NOTES
router.route("/archiveNote")
.get(UserArchiveNotesController.get_archive_note) // get all archive notes
.post(UserArchiveNotesController.add_to_archive_note_from_input_with_image); // from input + image

router.route("/archiveNote/onlytext")
.post(UserArchiveNotesController.add_note_to_archive_from_input) // from input only text

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

router.route("/archiveNote/title")
.post(TitleController.update_archive_notes_title) // update title

router.route("/archiveNote/description")
.post(DescriptionController.update_archive_notes_description) // update description

router.route("/archiveNote/image")
.post(ImageController.add_image_to_archive_note) // uplod image

router.route("/archiveNote/image/delete")
.post(ImageDeleteController.delete_image_from_archive_note) // delete image



////TRASH NOTES
router.route("/trash")
.get(UserTrashNotesController.get_trash_notes) // get trash notes

router.route("/trash/delete")
.post(UserTrashNotesController.delete_note_forever) // delete forever

router.route("/trash/restore")
.post(UserTrashNotesController.restore_note) //restore (sent to notes )


module.exports = router;