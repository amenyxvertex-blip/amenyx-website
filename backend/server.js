require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  auth: {
    user: process.env.EMAIL_USER, // e.g. amenyxvertex@gmail.com
    pass: process.env.EMAIL_PASS, // e.g. your 16-character Google App Password
  },
});

const handleContact = async (req, res) => {
  try {
    console.log("[DEBUG] Form submission received");
    console.log("[DEBUG] EMAIL_USER:", process.env.EMAIL_USER ? "SET" : "NOT SET");
    console.log("[DEBUG] EMAIL_PASS:", process.env.EMAIL_PASS ? "SET" : "NOT SET");
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("[ERROR] Email credentials not configured");
      return res.status(500).json({
        success: false,
        error: 'Mail service is not configured on the server.',
      });
    }

    const { 
      fullName, 
      email, 
      phone, 
      company, 
      service, 
      projectBudget, 
      linkedinUrl, 
      timeline, 
      message 
    } = req.body;

    console.log("[DEBUG] Form data received:", { fullName, email, phone, service });

    const emailHtmlBody = `
      <h2>New Form Submission | Amenyx Vortex 🚀</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone/WA:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>LinkedIn:</strong> ${linkedinUrl || 'N/A'}</p>
      <p><strong>Service Required:</strong> ${service}</p>
      <p><strong>Budget:</strong> ${projectBudget || 'N/A'}</p>
      <p><strong>Timeline:</strong> ${timeline}</p>
      <p><strong>Project Details:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
    `;

    const mailOptions = {
      from: `Amenyx Vortex Form <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send email to yourself (amenyxvertex@gmail.com)
      subject: `New Lead: ${fullName} - ${service}`,
      html: emailHtmlBody,
      replyTo: email // So you can hit 'Reply' and it goes to the lead
    };

    console.log("[DEBUG] Attempting to send email to:", mailOptions.to);
    console.log("[DEBUG] SMTP Config: host=smtp.gmail.com, port=587, secure=false");

    const info = await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Mail service timed out. Please try again.')), 15000);
      }),
    ]);
    
    console.log("[SUCCESS] Message sent with ID:", info.messageId);
    res.status(200).json({ success: true, message: 'Your details were successfully sent.' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    
    console.error("[ERROR] Nodemailer Error - Message:", errorMessage);
    console.error("[ERROR] Error Stack:", errorStack);
    console.error("[ERROR] Full Error Object:", JSON.stringify(error, null, 2));
    
    res.status(500).json({ 
      success: false, 
      error: 'Unable to send message at this time. Please email us directly.',
      debug: errorMessage 
    });
  }
};

app.post('/api/contact-email', handleContact);
app.post('/api/contact-whatsapp', handleContact);

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});