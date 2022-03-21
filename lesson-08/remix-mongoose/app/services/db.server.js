import mongoose from "mongoose";
import { bookSchema } from "~/models";

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

// We reuse any existing Mongoose db connection to avoid creating multiple
// connections in dev mode when Remix "purges the require cache" when reloading
// on file changes.
async function dbConnect() {
  // Reuse the existing Mongoose connection...
  if (mongoose.connection?.readyState > 0) {
    return mongoose.connection;
  }

  // ...or create a new connection:
  const connection = await mongoose
    .connect(MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((connection) => {
      console.log("Mongoose connected in %s", NODE_ENV);
      return connection;
    });

  // "Models are *always* scoped to a single connection." So we set them up
  // here to avoid overwriting them and getting errors in dev mode.
  // https://mongoosejs.com/docs/connections.html#multiple_connections
  connection.model("Book", bookSchema);

  return connection;
}

export default dbConnect;
