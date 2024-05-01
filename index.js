const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const favoriteRoutes = require("./routes/favoriteRoutes");
const locationRoutes = require("./routes/locationRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const realEstateRoutes = require("./routes/realEstateRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/favorite", favoriteRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/real-estates", realEstateRoutes);
app.use("/api/user", userRoutes);

// Private Route
// app.get("/private", authenticateToken, (req, res) => {
//   res.json({ message: "You have been authenticated" });
// });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("\nApp connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`\nServer is listening on http://localhost:${PORT}\n`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
