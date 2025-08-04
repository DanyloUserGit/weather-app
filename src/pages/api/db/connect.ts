import mongoose from "mongoose";

const MONGO_LINK = process.env.MONGO_LINK!;

if (!MONGO_LINK) {
  throw new Error("Invalid Mongo link");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_LINK).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connect;
