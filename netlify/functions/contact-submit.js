import { connectDB } from "./utils/db.js";
import { Resend } from "resend";
import { ObjectId } from "mongodb";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  try {
    const { pageId, name, email, message } = JSON.parse(event.body);

    const db = await connectDB();
    const submissions = db.collection("submissions");

    const page = await db.collection("pages").findOne({
      _id: new ObjectId(pageId),
    });

    const contactEmail = page?.sections?.contact?.email;

    // ✅ VALIDATIONS
    if (!contactEmail) {
      throw new Error("No contact email set");
    }

    if (!process.env.RESEND_API_KEY) {
      throw new Error("No email service configured");
    }

    // ✅ SAVE TO DB
    await submissions.insertOne({
      pageId,
      name,
      email,
      message,
      createdAt: new Date(),
    });

    // ✅ SEND EMAIL
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: contactEmail,
      subject: "New Contact Form Submission",
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};