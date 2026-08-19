# Resend Email Setup Guide

This guide details how to connect **Resend** so contact form submissions are delivered directly to your personal email inbox.

---

## Step 1: Create a Free Resend Account

1. Open **[resend.com](https://resend.com)** in your browser.
2. Sign up using your GitHub account or Email (Free tier: 3,000 emails/month).

---

## Step 2: Generate an API Key

1. Go to [resend.com/api-keys](https://resend.com/api-keys).
2. Click **"Create API Key"**.
3. Name it `portfolio` with **Full access** permission and click **Add**.
4. Copy the generated key (`re_...`).

---

## Step 3: Add to Your Local `.env` File

In the root of this project, create or edit the `.env` file:

```env
# Resend API Key (from https://resend.com/api-keys)
RESEND_API_KEY=re_your_actual_key_here

# Where you want to receive inquiries
CONTACT_RECIPIENT_EMAIL=your_email@domain.com
```

---

## Step 4: Verify Live Email Delivery on Localhost Immediately

> [!TIP]
> **You do NOT need to deploy to verify!** Resend works immediately on `localhost:3000`.

1. Run `pnpm dev` (or open your running `http://localhost:3000/#contact`).
2. Scroll to the contact form.
3. Submit a test inquiry:
   - **Name**: `Test Client`
   - **Email**: `your.other.email@example.com`
   - **Message**: `Hello, verifying live email delivery from localhost!`
4. Check your configured inbox. You will immediately receive the styled HTML email!

---

## Step 5: (Future Reference) When You Deploy to Production

Whenever you are ready to publish your portfolio to production (Vercel, Netlify, VPS):

1. Add `RESEND_API_KEY` and `CONTACT_RECIPIENT_EMAIL` to your hosting provider's **Environment Variables** dashboard.
2. Deploy as usual.
