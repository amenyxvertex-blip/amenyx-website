# Amenyx Vertex Frontend + WhatsApp Contact Integration

This project now includes:
- A dedicated contact page at `/contact`
- A backend API endpoint (`/api/contact-whatsapp`) that sends form submissions to WhatsApp using Twilio

## 1) Install dependencies

```bash
npm install
```

## 2) Configure environment variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Required Twilio values:
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_FROM` (example: `whatsapp:+14155238886` for Twilio sandbox)
- `TWILIO_WHATSAPP_TO` (your registered WhatsApp number)

## 3) Start development

Run frontend and backend together:

```bash
npm run dev:full
```

Default ports:
- Frontend: `http://localhost:8080` (or next available)
- Backend API: `http://localhost:8787`

## 4) Twilio WhatsApp sandbox note

If you are using Twilio sandbox, make sure your WhatsApp number has joined your sandbox first. Otherwise Twilio will reject outgoing messages.

## API reference

### `POST /api/contact-whatsapp`
Body JSON fields:
- `fullName` (required)
- `email` (required)
- `phone` (required)
- `company` (optional)
- `service` (optional)
- `projectBudget` (optional)
- `timeline` (optional)
- `message` (required)

Success response:

```json
{ "ok": true, "sid": "SMxxxxxxxx" }
```

Error response:

```json
{ "error": "Error message" }
```
