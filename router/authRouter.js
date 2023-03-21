const router = require("express").Router();
const authController = require("../controller/authController");
router.post("/login", authController.loginController);
router.post("/signup", authController.signupController);
router.get("/refresh", authController.refreshAccessTokenController);
router.post("/logout", authController.logoutController);
module.exports = router;
