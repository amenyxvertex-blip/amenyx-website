require('dotenv').config();
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Twilio
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.post('/api/contact-whatsapp', async (req, res) => {
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

    // Formatting the WhatsApp text professionally
    const msgBody = `*New Form Submission | Amenyx Vortex* 🚀\n\n` +
      `*Name:* ${fullName}\n` +
      `*Email:* ${email}\n` +
      `*Phone/WA:* ${phone}\n` +
      `*Company:* ${company || 'N/A'}\n` +
      `*LinkedIn:* ${linkedinUrl || 'N/A'}\n` +
      `*Service Required:* ${service}\n` +
      `*Budget:* ${projectBudget || 'N/A'}\n` +
      `*Timeline:* ${timeline}\n\n` +
      `*Project Details:*\n${message}`;

    console.log("Sending WhatsApp message...");

    const twilioResponse = await client.messages.create({
      body: msgBody,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${process.env.MY_WHATSAPP_NUMBER}`
    });

    console.log("Success! Message SID:", twilioResponse.sid);
    
    res.status(200).json({ success: true, message: 'Your details were successfully sent privately to WhatsApp.' });
  } catch (error) {
    console.error("Twilio Error:", error);
    res.status(500).json({ success: false, error: 'Unable to route message through WhatsApp integration at this time.' });
  }
});

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});