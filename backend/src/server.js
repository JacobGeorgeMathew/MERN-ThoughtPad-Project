import express from "express";//3:18
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/User.js";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/ratelimiter.js";
import checkForAuthenticationCookie from "./middleware/authentication.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();
//order of the middleware is very very important
app.use(express.json());//this  middleware parse JSON bodies
if (process.env.NODE_ENV !== "production") {
  app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // This allows cookies to be sent
}));
};
/*This middleware is added to avoid CORS(Cross Platform Resource Sharing) error , which is a browser security rule that avoids certain origins to access this API. */
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(ratelimiter);

//This route was added after the website has being deployed in render
app.get("/api/uptimerobot", (_, res) => {
  return res.status(200).json({message:"success"});
});

app.use("/api/user", userRoutes);
app.use("/api/notes",notesRoutes);

app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*",(req,res) => {
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
});

// if(process.env.NODE_ENV === "production"){
//   app.use(express.static(path.join(__dirname,"../frontend/dist")));

//   app.get("*",(req,res) => {
//   res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
// });
// };


connectDB().then(() => {
  app.listen(PORT,() => {
  console.log("Server Started at the port: ",PORT);
});
});
