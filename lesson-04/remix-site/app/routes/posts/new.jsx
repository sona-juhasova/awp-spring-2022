import { Link, redirect } from "remix";
import db from "~/db/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");
  const ingredients = form.get("ingredients");


const ingredientArray = ingredients.split(',');
   

 
  const uuid = new Date().getTime().toString(16);
  db.data.posts.push({ id: uuid, title, ingredients: ingredientArray, body });
  db.write();
  return redirect(`/posts/${uuid}`);
};

export default function NewPost() {
  return (
    <>
      <div className="page-header">
        <h1>New Recipe</h1>
        <Link to="/posts" className="btn btn-reverse">
          Back
        </Link>
      </div>
      <div className="page-content">
        <form method="POST">
          <div className="form-control">
            <label htmlFor="title">Title of the recipe</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="form-control">

          <label htmlFor="ingredients">Ingredients</label>
            <textarea name="ingredients" id="ingredients"></textarea>
            
          </div>
          <div className="form-control">
            <label htmlFor="body">Description</label>
            <textarea name="body" id="body"></textarea>
          </div>
          <button className="btn btn-block" type="submit">
            Add Recipe
          </button>
        </form>
      </div>
    </>
  );
}
