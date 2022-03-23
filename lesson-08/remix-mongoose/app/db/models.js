import { mongoose } from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  author: String,
  price: Number

});

export const models = [
  {
    name: "Book",
    schema: bookSchema,
    collection: "books",
  },
];
