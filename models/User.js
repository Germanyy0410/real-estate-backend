const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, required: true },
  fullname: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
});

const favoriteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  estate_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RealEstate",
    required: true,
  },
  created_at: { type: Date, default: Date.now() },
});

module.exports = {
  User: mongoose.model("User", userSchema),
  Favorite: mongoose.model("Favorite", favoriteSchema),
};
