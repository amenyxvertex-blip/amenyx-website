require('dotenv').config();
const express = require('express');
const cors = require('cors');
const postmark = require('postmark');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

const postmarkClient = process.env.POSTMARK_SERVER_TOKEN
  ? new postmark.ServerClient(process.env.POSTMARK_SERVER_TOKEN)
  : null;

const handleContact = async (req, res) => {
  try {
    console.log("[DEBUG] Form submission received");
    console.log("[DEBUG] POSTMARK_SERVER_TOKEN:", process.env.POSTMARK_SERVER_TOKEN ? "SET" : "NOT SET");
    console.log("[DEBUG] POSTMARK_FROM:", process.env.POSTMARK_FROM ? "SET" : "NOT SET");
    console.log("[DEBUG] POSTMARK_TO:", process.env.POSTMARK_TO ? "SET" : "NOT SET");
    
    if (!postmarkClient || !process.env.POSTMARK_FROM) {
      console.error("[ERROR] Postmark credentials not configured");
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

    const recipient = process.env.POSTMARK_TO || process.env.POSTMARK_FROM;
    const msg = {
      From: `Amenyx Vertex <${process.env.POSTMARK_FROM}>`,
      To: recipient,
      Subject: `New Lead: ${fullName} - ${service} | Amenyx Vertex`,
      HtmlBody: emailHtmlBody,
      ReplyTo: email,
    };

    console.log("[DEBUG] Attempting to send email to:", msg.To);

    const response = await postmarkClient.sendEmail(msg);

    console.log("[SUCCESS] Message sent with id:", response?.MessageID);
    res.status(200).json({ success: true, message: 'Your details were successfully sent.' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    
    console.error("[ERROR] Postmark Error - Message:", errorMessage);
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