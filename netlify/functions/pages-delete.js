import { connectDB } from "./utils/db.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const handler = async (event) => {
  try {
    const token = event.headers.authorization?.split(" ")[1];

    if (!token) {
      return { statusCode: 401, body: "Unauthorized" };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { pageId } = JSON.parse(event.body);

    const db = await connectDB();
    const pages = db.collection("pages");

    await pages.deleteOne({
      _id: new ObjectId(pageId),
      userId: decoded.userId, // 🔥 only owner can delete
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Delete failed" }),
    };
  }
};