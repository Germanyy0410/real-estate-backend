const express = require("express");
const router = express.Router();
const {
  getAllLocations,
  getLocationById,
  addLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");

router.get("/", getAllLocations);
router.get("/:id", getLocationById);
router.post("/add", addLocation);
router.put("/:id/update", updateLocation);
router.delete("/:id/delete", deleteLocation);

module.exports = router;
