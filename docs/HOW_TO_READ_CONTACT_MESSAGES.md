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

To receive real emails on your phone and personal inbox:

1. Create a free account at [https://resend.com](https://resend.com).
2. Generate an API Key (starts with `re_...`).
3. Add it to your `.env` file:
   ```env
   RESEND_API_KEY="re_your_api_key_here"
   CONTACT_RECIPIENT_EMAIL="your_email@domain.com"
   ```
4. Restart your Nuxt server:
   ```bash
   pnpm dev
   ```

Now, every message sent through the website form is dispatched using Resend to the `CONTACT_RECIPIENT_EMAIL` set in your `.env`.

---

### Summary Table

| Method | Where Messages Go | Setup Required | Best For |
| :--- | :--- | :--- | :--- |
| **1. Server Console** | Terminal stdout | Zero setup (works right now) | Quick local testing |
| **2. Resend Email** | Your configured inbox | Free Resend API key | Production portfolio |
