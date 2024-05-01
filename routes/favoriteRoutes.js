const express = require("express");
const router = express.Router();
const {
  getAllFavorites,
  addFavorite,
  deleteFavorite,
} = require("../controllers/favoriteController");

router.get("/", getAllFavorites);
router.post("/add", addFavorite);
router.delete("/:id/delete", deleteFavorite);

module.exports = router;
