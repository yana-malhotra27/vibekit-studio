import { connectDB } from "./utils/db.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const handler = async (event) => {
  const token = event.headers.authorization?.split(" ")[1];

  if (!token) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  jwt.verify(token, process.env.JWT_SECRET);

  // ✅ GET FULL SECTIONS
  const { pageId, title, theme, sections } = JSON.parse(event.body);

  const db = await connectDB();
  const pages = db.collection("pages");

  await pages.updateOne(
    { _id: new ObjectId(pageId) },
    {
      $set: {
        title,
        theme,
        sections,
        updatedAt: new Date(),
      },
    }
  );

  console.log("Updating:", { pageId, title, theme, sections });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};