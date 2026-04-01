import { connectDB } from "./utils/db.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const handler = async (event) => {
  const token = event.headers.authorization?.split(" ")[1];

  if (!token) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const { pageId, title } = JSON.parse(event.body);

  const db = await connectDB();
  const pages = db.collection("pages");

  // simple slug generator
  const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

  await pages.updateOne(
    { _id: new ObjectId(pageId), userId: decoded.userId },
    {
      $set: {
        status: "published",
        slug,
        publishedAt: new Date(),
      },
    }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ slug }),
  };
};