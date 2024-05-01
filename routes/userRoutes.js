const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile);
router.put("/profile/update", updateProfile);
router.delete("/profile/delete", deleteProfile);

module.exports = router;
