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
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // e.g. amenyxvertex@gmail.com
    pass: process.env.EMAIL_PASS, // e.g. your 16-character Google App Password
  },
});

app.post('/api/contact-email', async (req, res) => {
  try {
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

    console.log("Sending email...");

    const mailOptions = {
      from: `Amenyx Vortex Form <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send email to yourself (amenyxvertex@gmail.com)
      subject: `New Lead: ${fullName} - ${service}`,
      html: emailHtmlBody,
      replyTo: email // So you can hit 'Reply' and it goes to the lead
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Success! Message sent:", info.messageId);
    
    res.status(200).json({ success: true, message: 'Your details were successfully sent.' });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    res.status(500).json({ success: false, error: 'Unable to send message at this time. Please email us directly.' });
  }
});

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});