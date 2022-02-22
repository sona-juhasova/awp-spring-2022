import path from "path";

export default async function createDb() {
  const lowdb = await import("lowdb");
  const file = path.join(__dirname, "../app/db/db.json");
  const adapter = new lowdb.JSONFileSync(file);
  const db = new lowdb.LowSync(adapter);
  console.log("db created");

  db.read();
  db.data = db.data || { posts: [] };
  return db;
}
