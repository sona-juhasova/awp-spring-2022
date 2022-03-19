import { useLoaderData } from "remix";
import dbConnect from "~/services/db.server.js";
import { Book } from "~/models";

export async function loader() {
  await dbConnect();
  const books = await Book.find();
  return books;
}

export default function Index() {
  const books = useLoaderData();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Remix + MongoDB</h1>
      <h2 className="text-lg font-bold mb-3">
        Here are a few of my favorite books:
      </h2>
      <ul className="ml-5 list-disc">
        {books.map((book) => {
          return <li key={book._id}>{book.title}</li>;
        })}
      </ul>
    </div>
  );
}
