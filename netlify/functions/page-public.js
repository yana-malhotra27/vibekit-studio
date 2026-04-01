import { connectDB } from "./utils/db.js";

export const handler = async (event) => {
  const slug = event.queryStringParameters.slug;

  const db = await connectDB();
  const pages = db.collection("pages");

  const page = await pages.findOne({ slug, status: "published" });
    await pages.updateOne(
  { slug },
  { $inc: { viewCount: 1 } }
);
  return {
    statusCode: 200,
    body: JSON.stringify(page),
  };
};