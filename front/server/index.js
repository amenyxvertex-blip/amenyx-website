import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import twilio from "twilio";

dotenv.config();

const app = express();
const port = Number(process.env.SERVER_PORT ?? 8787);
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? "http://localhost:8080,http://localhost:8081,http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Origin not allowed by CORS"));
    },
  }),
);
app.use(express.json());

const requiredEnv = [
  "TWILIO_ACCOUNT_SID",
  "TWILIO_AUTH_TOKEN",
  "TWILIO_WHATSAPP_FROM",
  "TWILIO_WHATSAPP_TO",
];

const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length > 0) {
  // Fail early so misconfiguration is obvious in logs.
  console.warn(`Missing required environment variables: ${missing.join(", ")}`);
}

const normalizeText = (value = "") => String(value).replace(/\s+/g, " ").trim();

const buildWhatsAppMessage = (payload) => {
  const now = new Date().toISOString();

  return [
    "*New Contact Form Submission*",
    `Time: ${now}`,
    "",
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Company: ${payload.company || "N/A"}`,
    `Service: ${payload.service || "N/A"}`,
    `Budget: ${payload.projectBudget || "N/A"}`,
    `Timeline: ${payload.timeline || "N/A"}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
};

app.post("/api/contact-whatsapp", async (req, res) => {
  try {
    const form = {
      fullName: normalizeText(req.body.fullName),
      email: normalizeText(req.body.email),
      phone: normalizeText(req.body.phone),
      company: normalizeText(req.body.company),
      service: normalizeText(req.body.service),
      projectBudget: normalizeText(req.body.projectBudget),
      timeline: normalizeText(req.body.timeline),
      message: normalizeText(req.body.message),
    };

    if (!form.fullName || !form.email || !form.phone || !form.message) {
      return res.status(400).json({
        error: "Name, email, phone, and message are required.",
      });
    }

    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_WHATSAPP_FROM || !process.env.TWILIO_WHATSAPP_TO) {
      return res.status(500).json({
        error: "Twilio environment variables are missing on the server.",
      });
    }

    const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    const body = buildWhatsAppMessage(form);

    const message = await twilioClient.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.TWILIO_WHATSAPP_TO,
      body,
    });

    return res.status(200).json({ ok: true, sid: message.sid });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send WhatsApp message.";
    return res.status(500).json({ error: message });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`WhatsApp API listening on port ${port}`);
});
