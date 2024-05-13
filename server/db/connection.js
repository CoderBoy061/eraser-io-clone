import mongoose from "mongoose";

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error while connecting to MongoDB", error);
  }
};

export default connection;
