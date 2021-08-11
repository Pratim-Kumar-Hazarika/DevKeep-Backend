const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user.controller");
const UserNotesController = require("../controllers/note.controller")
const UserPinnedNotesController = require("../controllers/pinned.notes.controller")
const UserArchiveNotesController = require("../controllers/archive.notes.controller")
const {userLogger} = require("../middlewares/authHandler");
const NoteParams = require("../middlewares/noteParams")
const { ArchiveNote } = require('../models/archive.notes.model');
const { Note } = require('../models/notes.model');
const { PinnedNote } = require('../models/pinned.notes.model');

router.route("/")
.get(UserController.get_all_users)
.post(UserController.add_user)

router.route("/login")
.post(UserController.user_login)

router.use(userLogger)

//notes---
router.route("/notes")
.get(UserNotesController.get_user_note)
.post(UserNotesController.add_note_from_input)

router.route("/notes/sendToPinNote")///when sending to pin delete from notes
.post(UserNotesController.add_note_to_pinnedNotes)



//Pinned Notes----
router.route("/pinnedNote")
.get(UserPinnedNotesController.get_pinned_notes)
.post(UserPinnedNotesController.add_to_pinned_note_from_input)

router.route("/pinnedNote/sendToNote")
.post(UserPinnedNotesController.add_pinnedNote_to_note)

//ArchiveNote---
router.route("/archiveNote")
.get(UserArchiveNotesController.get_archive_note)
.post(UserArchiveNotesController.add_to_archive_note_from_input);

module.exports = router;