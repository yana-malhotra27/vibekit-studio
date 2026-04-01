import { connectDB } from "./utils/db.js";
import jwt from "jsonwebtoken";

export const handler = async (event) => {
  const token = event.headers.authorization?.split(" ")[1];

  if (!token) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const db = await connectDB();
  const pages = db.collection("pages");

  const userPages = await pages
    .find({ userId: decoded.userId })
    .toArray();

  return {
    statusCode: 200,
    body: JSON.stringify(userPages),
  };
};