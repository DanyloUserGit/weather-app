import mongoose, { Mongoose } from "mongoose";

const MONGO_LINK = process.env.MONGO_LINK!;

if (!MONGO_LINK) {
  throw new Error("Invalid Mongo link");
}

interface MongooseGlobal {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseGlobal | undefined;
}

const cached: MongooseGlobal = global.mongoose ?? {
  conn: null,
  promise: null,
};

async function connect(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_LINK).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}

export default connect;
