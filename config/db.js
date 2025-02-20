import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (cached.promise) {
    const options = { bufferCommands: false };
  }

  cached.promise = mongoose
    .connect(`${process.env.MONGO_URI}/Quickcart`, options)
    .then((mongoose) => {
      return mongoose;
    });

  cached.conn = await cached.process;
  return cached.conn;
};

export default connectDB;
