import { Link, redirect } from "remix";
import { useLoaderData } from "remix";
import db from "~/db/db.server";

export const loader = async function ({ params }) {
  const post = db.data.posts.find((p) => p.id === params.postId);

  if (!post) {
    throw new Error("Recipe not found");
  }
  return {
    post,
  };
};

export const action = async function ({ request, params }) {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    db.data.posts = db.data.posts.filter((p) => p.id !== params.postId);
    db.write();
    return redirect("/posts");
  }
};



export default function Post() {
  const { post } = useLoaderData();

  const ingredientsListed = post.ingredients.map(ingredient => {
    return <li>{ingredient}</li>;
  });


  return (
    <div>
      <div className="page-header">
        <h1>{post.title}</h1>
        <Link to=".." className="btn btn-reverse">
          Back
        </Link>
      </div>
      <ul className="page-content">{ingredientsListed}</ul>
      <p className="page-content">{post.body}</p>
      <div className="page-footer">
        <form method="post">
          <input type="hidden" name="_method" value="delete" />
          <button type="submit" className="btn btn-delete">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
