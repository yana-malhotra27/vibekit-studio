import { connectDB } from "./utils/db.js";
import jwt from "jsonwebtoken";

export const handler = async (event) => {
  const token = event.headers.authorization?.split(" ")[1];

  if (!token) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const { title } = JSON.parse(event.body);

  const db = await connectDB();
  const pages = db.collection("pages");

  const newPage = {
  userId: decoded.userId,
  title,
  status: "draft",
  theme: "dark", // default theme
  sections: {
    hero: {
      title: "Welcome",
      subtitle: "Your subtitle",
      buttonText: "Get Started",
      buttonUrl: "#",
    },
    features: [
      { title: "", desc: "" }
    ],
    gallery: [],
    contact: {},
  },
  slug: title.toLowerCase().replace(/\s+/g, "-"), // basic slug
  viewCount: 0,
  createdAt: new Date(),
};

  const result = await pages.insertOne(newPage);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};