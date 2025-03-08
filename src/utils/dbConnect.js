import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://kunalkhairnar96:pzWgLjDtT31bGcVh@cluster0.0a3v1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function dbConnect() {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection;
    console.log("db",db)
  } catch (error) {
    console.log("Error connecting with Mongodb", error)
  }
  
}

export default dbConnect;