import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/ratelimiter.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
//order of the middleware is very very important
app.use(express.json());//this  middleware parse JSON bodies
app.use(cors({
  origin: "http://localhost:5173",
}));/*This middleware is added to avoid CORS(Cross Platform Resource Sharing) error , which is a browser security rule that avoids certain origins to access this API. */
app.use(ratelimiter);

app.use("/api/notes",notesRoutes);

connectDB().then(() => {
  app.listen(PORT,() => {
  console.log("Server Started at the port: ",PORT);
});
});
