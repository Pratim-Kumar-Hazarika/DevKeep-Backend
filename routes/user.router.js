const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.route("/")
.get(UserController.get_all_users)
.post(UserController.add_user)

router.route("/login")
.post(UserController.user_login)

module.exports = router;