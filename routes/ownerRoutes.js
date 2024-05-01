const express = require("express");
const router = express.Router();
const {
  getAllOwners,
  getOwnerById,
  addOwner,
  updateOwner,
  deleteOwner,
} = require("../controllers/ownerController");

router.get("/", getAllOwners);
router.get("/:id", getOwnerById);
router.post("/add", addOwner);
router.put("/:id/update", updateOwner);
router.delete("/:id/delete", deleteOwner);

module.exports = router;
