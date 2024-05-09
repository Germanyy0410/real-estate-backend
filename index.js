import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(json());

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("\nApp connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
