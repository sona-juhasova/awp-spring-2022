import { mongoose } from "mongoose";

export const bookSchema = new mongoose.Schema({
  title: String,
});
