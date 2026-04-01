import { connectDB } from "./utils/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const handler = async (event) => {
  const { email, password } = JSON.parse(event.body);

  const db = await connectDB();
  const users = db.collection("users");

  const existing = await users.findOne({ email });
  if (existing) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "User already exists" }),
    };
  }

  const hashed = await bcrypt.hash(password, 10);

  const result = await users.insertOne({
    email,
    password: hashed,
  });

  // 🔑 Create token
  const token = jwt.sign({ id: result.insertedId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ token, message: "User created" }),
  };
};