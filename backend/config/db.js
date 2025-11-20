import mongoose from "mongoose";

const mongo_url = process.env.MONGO_URI;
if (!mongo_url) console.log("mongo url not defined");

const connectDB = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
