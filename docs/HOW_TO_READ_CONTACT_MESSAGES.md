# How to Read Submitted Contact Messages

There are three ways to view and receive messages submitted through the contact form:

---

## Method 1: Local Server Console (Active Now)

Whenever someone submits the form, Nuxt Nitro outputs the message to your terminal running `pnpm dev` or `node .output/server/index.mjs`:

```text
[Contact API] Received submission from John Doe <john@example.com>:
Hello Arief! I would like to collaborate on an interactive 3D WebGL project.
```

---

## Method 2: Local JSON Inbox File (`data/inbox.json`)

We can configure `server/api/contact.post.ts` to automatically store all incoming submissions to a structured JSON file in your repository:

### How it looks in `data/inbox.json`:
```json
[
  {
    "id": "msg_8f921a",
    "timestamp": "2026-08-16T13:03:47.827Z",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hi Arief, we'd love to hire you for a project."
  }
]
```
> **Benefit**: Requires 0 third-party signups or API keys. You can open `data/inbox.json` in your IDE anytime to read all inquiries.

---

## Method 3: Direct to your Gmail Inbox via Resend (Recommended for Production)

To receive real emails on your phone and personal inbox (`ariefsatria2409@gmail.com`):

### 1. Get a Free Resend API Key
1. Go to [resend.com](https://resend.com) and create a free account (3,000 emails/month free).
2. Create an API key (`re_123456789...`).
3. Add it to your `.env` file:
   ```env
   RESEND_API_KEY="re_123456789..."
   CONTACT_RECIPIENT_EMAIL="ariefsatria2409@gmail.com"
   ```

### 2. How the Server Code Sends It:
```ts
// server/api/contact.post.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "Portfolio Contact <onboarding@resend.dev>",
  to: process.env.CONTACT_RECIPIENT_EMAIL || "ariefsatria2409@gmail.com",
  reply_to: sanitizedEmail,
  subject: `New Inquiry from ${sanitizedName}`,
  text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}`,
});
```

---

## Comparison Table

| Method | Where You Read It | Setup Required | Best For |
|---|---|---|---|
| **1. Console Output** | Terminal logs | None (Working now) | Local quick testing |
| **2. `data/inbox.json`** | File in your IDE | 1 line of server code | Zero-dependency local archiving |
| **3. Resend Email** | Your Gmail (`ariefsatria2409@gmail.com`) | Free Resend API key | Production portfolio |
