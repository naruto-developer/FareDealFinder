import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { readFile } from "node:fs/promises";
import path from "node:path";
import handlebars from "handlebars";

export const runtime = "nodejs";
const topics = ["Planning a trip", "Existing booking", "Billing question", "General inquiry"];

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }
  const fields = data as Record<string, unknown>;
  const read = (key: string) => typeof fields[key] === "string" ? fields[key].trim() : "";
  const name = read("name");
  const email = read("email");
  const phone = read("phone");
  const subject = read("subject");
  const message = read("message");
  if (!name || name.length > 100 || /[\r\n]/.test(name) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
      phone.length > 40 || /[\r\n]/.test(phone) ||
      !topics.includes(subject) || !message || message.length > 5000) {
    return NextResponse.json({ success: false, error: "Please provide a valid name, email, subject and message." }, { status: 400 });
  }
  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_FROM || !process.env.SMTP_TO) {
      throw new Error("Contact email configuration is missing.");
    }
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    const template = await readFile(path.join(process.cwd(), "templates", "contact.html"), "utf8");
    const html = handlebars.compile(template)({
      name,
      email,
      phone: phone || "Not provided",
      subject,
      messageLines: message.split(/\r\n|\r|\n/),
    });
    await transporter.sendMail({
      from: `"FareDealFinder" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `Contact inquiry | ${subject}`,
      html,
      text: `New FareDealFinder contact inquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });
    return NextResponse.json({ success: true });
  } catch {
    console.error("Unable to send contact inquiry.");
    return NextResponse.json({ success: false, error: "Unable to send your message. Please try again or contact us by phone or email." }, { status: 500 });
  }
}
