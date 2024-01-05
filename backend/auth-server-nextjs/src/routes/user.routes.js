const router = require("express").Router();

const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");

router.patch("/update-me", authController.protect ,userController.updateMe);

module.exports = router;
