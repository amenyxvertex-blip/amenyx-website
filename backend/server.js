require('dotenv').config();
const express = require('express');
const cors = require('cors');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

const mailgun = new Mailgun(formData);
const mailgunClient = process.env.MAILGUN_API_KEY
  ? mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })
  : null;

const handleContact = async (req, res) => {
  try {
    console.log("[DEBUG] Form submission received");
    console.log("[DEBUG] MAILGUN_API_KEY:", process.env.MAILGUN_API_KEY ? "SET" : "NOT SET");
    console.log("[DEBUG] MAILGUN_DOMAIN:", process.env.MAILGUN_DOMAIN ? "SET" : "NOT SET");
    console.log("[DEBUG] MAILGUN_FROM:", process.env.MAILGUN_FROM ? "SET" : "NOT SET");
    
    if (!mailgunClient || !process.env.MAILGUN_DOMAIN || !process.env.MAILGUN_FROM) {
      console.error("[ERROR] Mailgun credentials not configured");
      return res.status(500).json({
        success: false,
        error: 'Email service is not configured on the server.',
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

    const msg = {
      from: `Amenyx Vortex Form <${process.env.MAILGUN_FROM}>`,
      to: process.env.MAILGUN_FROM,
      subject: `New Lead: ${fullName} - ${service}`,
      html: emailHtmlBody,
      'h:Reply-To': email,
    };

    console.log("[DEBUG] Attempting to send email to:", msg.to);

    const response = await mailgunClient.messages.create(process.env.MAILGUN_DOMAIN, msg);

    console.log("[SUCCESS] Message sent with id:", response?.id);
    res.status(200).json({ success: true, message: 'Your details were successfully sent.' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    
    console.error("[ERROR] Mailgun Error - Message:", errorMessage);
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