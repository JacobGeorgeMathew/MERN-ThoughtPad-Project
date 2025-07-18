import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected succesfully");
  } catch (error) {
    console.error("Error connecting to MongoDB,IDIOT! check the network connection",error);
    process.exit(1);//since this is in catch block, 1 means exit with a failure
  }
}