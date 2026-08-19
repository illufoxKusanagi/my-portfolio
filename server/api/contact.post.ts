import { defineEventHandler, readBody, createError, getRequestIP } from "h3";
import { Resend } from "resend";

interface ContactRequestBody {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company_url?: unknown; // Honeypot field
}

// In-memory rate limiting map: IP -> timestamp array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000; // 2 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Strict email RFC 5322 regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const sanitizeHtml = (input: string): string => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export default defineEventHandler(async (event) => {
  // 1. IP Rate Limiting
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || "127.0.0.1";
  const now = Date.now();
  const timestamps = (rateLimitMap.get(clientIp) || []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    throw createError({
      statusCode: 429,
      statusMessage: "Too Many Requests",
      data: {
        message: "You have exceeded the submission limit. Please wait 2 minutes before trying again.",
      },
    });
  }

  // 2. Parse Body
  const body = (await readBody<ContactRequestBody>(event)) || {};

  // 3. Spam Honeypot Guard (Silently trap automated bots)
  if (typeof body.company_url === "string" && body.company_url.trim().length > 0) {
    return {
      success: true,
      message: "Transmission received.",
      timestamp: new Date().toISOString(),
    };
  }

  // 4. Input Validation
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const errors: Record<string, string> = {};

  if (!name || name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Name cannot exceed 100 characters.";
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = "Please provide a valid email address.";
  } else if (email.length > 150) {
    errors.email = "Email cannot exceed 150 characters.";
  }

  if (!message || message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.length > 3000) {
    errors.message = "Message cannot exceed 3,000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    throw createError({
      statusCode: 422,
      statusMessage: "Unprocessable Entity",
      data: {
        message: "Validation failed. Please check the fields below.",
        errors,
      },
    });
  }

  // 5. Update rate limit tracker
  timestamps.push(now);
  rateLimitMap.set(clientIp, timestamps);

  // 6. Sanitize payload for HTML rendering
  const sanitizedName = sanitizeHtml(name);
  const sanitizedEmail = sanitizeHtml(email);
  const sanitizedMessage = sanitizeHtml(message);

  // 7. Resend SDK Dispatch
  const config = useRuntimeConfig(event);
  const resendApiKey =
    (config.resendApiKey as string) ||
    process.env.RESEND_API_KEY ||
    process.env.NUXT_RESEND_API_KEY ||
    process.env.RESEND_KEY ||
    process.env.RESEND_TOKEN;
  const recipientEmail =
    (config.contactRecipientEmail as string) ||
    process.env.CONTACT_RECIPIENT_EMAIL ||
    process.env.NUXT_CONTACT_RECIPIENT_EMAIL ||
    "illuzen1348tcr@gmail.com";

  if (!resendApiKey) {
    console.error("[Contact API] Missing RESEND_API_KEY environment variable.");
    throw createError({
      statusCode: 503,
      statusMessage: "Service Unavailable",
      data: {
        message: "Email service is temporarily unconfigured. Please contact directly at illuzen1348tcr@gmail.com.",
      },
    });
  }

  const resend = new Resend(resendApiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email,
      subject: `[Portfolio Inquiry] from ${sanitizedName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 32px 24px; background-color: #ffffff; color: #0f172a; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #0f172a; line-height: 1.3;">New Message from ${sanitizedName}</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #64748b; width: 90px; vertical-align: top;">From</td>
              <td style="padding: 6px 0; color: #0f172a; font-weight: 500;">${sanitizedName} &lt;<a href="mailto:${sanitizedEmail}" style="color: #2563eb; text-decoration: none;">${sanitizedEmail}</a>&gt;</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; vertical-align: top;">Date</td>
              <td style="padding: 6px 0; color: #64748b;">${new Date().toUTCString()}</td>
            </tr>
          </table>

          <div style="padding: 16px 20px; background-color: #f8fafc; border-radius: 6px; border-left: 3px solid #2563eb; margin-bottom: 24px;">
            <p style="margin: 0; color: #334155; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${sanitizedMessage}</p>
          </div>

          <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; font-size: 13px; color: #94a3b8;">
            <p style="margin: 0;">Reply directly to this email to respond to <a href="mailto:${sanitizedEmail}" style="color: #2563eb; text-decoration: none;">${sanitizedEmail}</a>.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[Contact API] Resend dispatch error:", error);
      throw createError({
        statusCode: 502,
        statusMessage: "Bad Gateway",
        data: {
          message: error.message || "Failed to dispatch email through Resend.",
        },
      });
    }

    return {
      success: true,
      message: "Thank you! Your message has been transmitted directly to my inbox.",
      messageId: data?.id,
      timestamp: new Date().toISOString(),
    };
  } catch (err: any) {
    if (err.statusCode) throw err;
    console.error("[Contact API] Unexpected error during Resend dispatch:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: {
        message: "An unexpected error occurred while sending your message. Please try emailing directly at illuzen1348tcr@gmail.com.",
      },
    });
  }
});
