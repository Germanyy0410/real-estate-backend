import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
require("dotenv").config();
import favoriteRoutes from "./routes/favoriteRoutes";
import locationRoutes from "./routes/locationRoutes";
import ownerRoutes from "./routes/ownerRoutes";
import realEstateRoutes from "./routes/post.route";
import userRoutes from "./routes/user.route";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(json());

app.use("/api/posts", );
app.use("/api/users", userRoutes);

// Private Route
// app.get("/private", authenticateToken, (req, res) => {
//   res.json({ message: "You have been authenticated" });
// });

connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("\nApp connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`\nServer is listening on http://localhost:${PORT}\n`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
