import { connectDB } from "./utils/db.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const handler = async (event) => {
  const token = event.headers.authorization?.split(" ")[1];

  if (!token) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const { pageId, title, theme, hero } = JSON.parse(event.body);

  const db = await connectDB();
  const pages = db.collection("pages");

 await pages.updateOne(
  { _id: new ObjectId(pageId) },
  {
    $set: {
      title,
      theme,
      "sections.hero": hero, // ✅ THIS IS THE REAL FIX
      updatedAt: new Date(),
    },
  }
);
      console.log("Updating:", { pageId, title, theme, hero });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};