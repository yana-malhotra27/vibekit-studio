import { connectDB } from "./utils/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const handler = async (event) => {
  const { email, password } = JSON.parse(event.body);

  const db = await connectDB();
  const users = db.collection("users");

  const user = await users.findOne({ email });

  if (!user) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid credentials" }),
    };
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid credentials" }),
    };
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ token }),
  };
};