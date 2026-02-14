
const express = require("express");
const router = express.Router();
const wrapAsync = require("../helper/wrapAsync");
const UserController = require("../controller/UserController");
const authCheck = require("../middleware/authCheck");

router.post("/auth/signup", wrapAsync(UserController.signup));
router.post("/auth/login", wrapAsync(UserController.login));
router.post("/auth/logout", authCheck, wrapAsync(UserController.logout));
router.get("/auth/all-user", authCheck, wrapAsync(UserController.allUser));


module.exports = router;