require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const handleContact = async (req, res) => {
  try {
    console.log("[DEBUG] Form submission received");
    console.log("[DEBUG] SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY ? "SET" : "NOT SET");
    console.log("[DEBUG] SENDGRID_FROM:", process.env.SENDGRID_FROM ? "SET" : "NOT SET");
    
    if (!process.env.SENDGRID_API_KEY || !process.env.SENDGRID_FROM) {
      console.error("[ERROR] SendGrid credentials not configured");
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
      from: {
        email: process.env.SENDGRID_FROM,
        name: 'Amenyx Vortex Form',
      },
      to: process.env.SENDGRID_FROM,
      subject: `New Lead: ${fullName} - ${service}`,
      html: emailHtmlBody,
      replyTo: email,
    };

    console.log("[DEBUG] Attempting to send email to:", msg.to);

    const [response] = await sgMail.send(msg);

    console.log("[SUCCESS] Message sent with status:", response?.statusCode);
    res.status(200).json({ success: true, message: 'Your details were successfully sent.' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    
    console.error("[ERROR] SendGrid Error - Message:", errorMessage);
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