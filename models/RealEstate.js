const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
});

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  longitude: { type: String },
  latitude: { type: String },
});

const realEstateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  url: { type: String },
  property_type: { type: String, required: true },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },
  location_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  area: { type: Number },
  status: { type: String },
  bedroom: { type: Number },
  bathroom: { type: Number },
  description: { type: String },
  images: { type: String },
  source: { type: String },
  posting_date: { type: Date, default: Date.now() },
  expiration_date: { type: Date },
});

module.exports = {
  Owner: mongoose.model("Owner", ownerSchema),
  Location: mongoose.model("Location", locationSchema),
  RealEstate: mongoose.model("RealEstate", realEstateSchema),
};
