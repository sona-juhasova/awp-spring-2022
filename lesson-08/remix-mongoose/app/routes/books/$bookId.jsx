
import { useLoaderData, json } from "remix";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ params }) {
  const db = await connectDb();
  const book = db.models.Book.findById(params.bookId);
  if (!book) {
    throw new Response(`Couldn't find book with id ${params.bookId}`, {
      status: 404,
    });
  }
  return json(book);
}


export default function BookPage() {
  const book = useLoaderData();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <code>
        <pre>{JSON.stringify(book, null, 2)}</pre>
      </code>
    </div>
  );
}
