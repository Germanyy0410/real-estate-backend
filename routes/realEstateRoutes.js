const express = require("express");
const router = express.Router();
const {
  getAllRealEstates,
  getRealEstateById,
  addRealEstate,
  updateRealEstate,
  deleteRealEstate,
} = require("../controllers/realEstateController");

router.get("/", getAllRealEstates);
router.get("/:id", getRealEstateById);
router.post("/add", addRealEstate);
router.put("/:id/update", updateRealEstate);
router.delete("/:id/delete", deleteRealEstate);

module.exports = router;
