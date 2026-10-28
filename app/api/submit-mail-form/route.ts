import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (
      !data?.Name ||
      !data?.Email ||
      !data?.Phone ||
      !data?.search?.from?.name ||
      !data?.search?.to?.name ||
      !data?.search?.departureDate
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Contact and flight search details are required.",
        },
        { status: 400 },
      );
    }

    const templateData = {
      name: data.Name,
      email: data.Email,
      phone: data.Phone,

      tripType: data.search.tripType,
      from: data.search.from.name,
      to: data.search.to.name,

      departureDate: data.search.departureDate,
      returnDate: data.search.returnDate,

      travelers: data.search.travelers,
      cabin: data.search.cabin,
      cabinLabel: data.search.cabinLabel,
    };
    // 1. Configure the SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 2. Resolve the path to the HTML template file
    const templatePath = path.join(process.cwd(), "templates", "mail.html");

    // 3. Read the HTML file content asynchronously
    const templateSource = fs.readFileSync(templatePath, "utf8");

    // 4. Compile the template using Handlebars and inject the dynamic variables
    const compiledTemplate = handlebars.compile(templateSource);
    const htmlToSend = compiledTemplate(templateData);

    // 5. Set up email configurations
    const mailOptions = {
      from: `"FareDealFinder" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      subject: `✈️ New Flight Quote Request | ${data.Name} | ${data.Email} | ${data.search.from.code} → ${data.search.to.code}`,
      html: htmlToSend,
    };

    // 6. Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unable to send your request. Please try again.",
      },
      { status: 500 },
    );
  }
}
