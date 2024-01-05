const router = require("express").Router();

const authController = require("../Controllers/authController");

router.post("/login", authController.login);
router.post("/register", authController.register, authController.sendOTP);
// router.post("/register", authController.register);

router.post("/send-otp", authController.sendOTP);
router.post("/verify-otp", authController.verifyOTP);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

// just for the test purposes
router.get("/status", (req, res) => {
  return res.status(200).json({
    status: "OK",
    message: "auth routes responded",
  });
});

router.post("/status", (req, res) => {
  return res.status(200).json({
    status: "OK",
    data: req.body.data,
    message: "auth routes responded",
  });
});

module.exports = router;
