import mongoose from "mongoose";

// Hat tip: https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js

const { MONGODB_URL, NODE_ENV } = process.env;

if (!MONGODB_URL) {
  if (NODE_ENV === "production") {
    throw new Error(
      "Please define the MONGODB_URL environment variable — pointing to your full connection string, including database name."
    );
  } else {
    throw new Error(
      "Please define the MONGODB_URL environment variable inside an .env file — pointing to your full connection string, including database name."
    );
  }
}

/**
 * Global variable is used here to maintain a cached connection across hot reloads
 * in development so we don't open multiple connections.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URL, options).then((mongoose) => {
      console.log("Mongoose connected in %s", NODE_ENV);
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
