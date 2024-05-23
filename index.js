import express from "express";
import { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cookieParser());
app.use(json());

app.use(
  cors({
    origin: "https://real-estate-frontend-xi.vercel.app",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("\nApp connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
