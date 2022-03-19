import { mongoose } from "mongoose";

const bookSchema = mongoose.Schema({
  title: String,
});

// Avoid redefining models during hot reloads in development
export default {
  Book: mongoose.models.Book ?? mongoose.model("Book", bookSchema),
};
