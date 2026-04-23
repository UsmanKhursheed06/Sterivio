import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const quoteReceiverEmail = process.env.QUOTE_RECEIVER_EMAIL || process.env.RESEND_TO_EMAIL;
const fromEmail = process.env.RESEND_FROM_EMAIL || "Sterivio <onboarding@resend.dev>";
const brandPrimary = "#0891b2";
const brandDark = "#0f172a";
const brandBg = "#f8fafc";

type RequestQuotePayload = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toHtmlText(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function brandShell(title: string, subtitle: string, body: string): string {
  return `
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin:0;padding:0;background:${brandBg};font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;color:${brandDark};">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${brandBg};padding:24px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
                <tr>
                  <td style="background:${brandDark};padding:24px;">
                    <div style="font-size:12px;letter-spacing:1.8px;text-transform:uppercase;color:#93c5fd;font-weight:700;">Sterivio</div>
                    <h1 style="margin:8px 0 0 0;font-size:26px;line-height:1.25;color:#ffffff;">${title}</h1>
                    <p style="margin:8px 0 0 0;font-size:14px;line-height:1.6;color:#cbd5e1;">${subtitle}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px;">${body}</td>
                </tr>
                <tr>
                  <td style="padding:18px 24px;background:#f1f5f9;border-top:1px solid #e2e8f0;">
                    <p style="margin:0;font-size:12px;line-height:1.5;color:#475569;">
                      Sterivio | Professional veterinary and grooming products
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;font-weight:700;color:#334155;width:130px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#0f172a;vertical-align:top;">${toHtmlText(value)}</td>
    </tr>
  `;
}

function buildInternalEmailHtml(payload: RequestQuotePayload): string {
  const { name, company, email, phone, message } = payload;

  return brandShell(
    "New Quote Request",
    "A new inquiry was submitted from your website form.",
    `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;border-collapse:separate;border-spacing:0;">
        ${detailRow("Name", name)}
        ${detailRow("Company", company)}
        ${detailRow("Email", email)}
        ${detailRow("Phone", phone || "Not provided")}
        ${detailRow("Message", message)}
      </table>
      <p style="margin:16px 0 0 0;font-size:12px;line-height:1.6;color:#64748b;">
        Reply directly to this email to respond to the sender.
      </p>
    `
  );
}

function buildConfirmationEmailHtml(payload: RequestQuotePayload): string {
  const { name, company, phone, message } = payload;

  return brandShell(
    "Request Received",
    "Thank you for reaching out to Sterivio.",
    `
      <p style="margin:0 0 14px 0;font-size:15px;line-height:1.7;color:#0f172a;">
        Hi ${escapeHtml(name)},<br>
        We received your request and our team will get back to you shortly.
      </p>
      <div style="margin:0 0 16px 0;padding:14px;border:1px solid #bae6fd;background:#ecfeff;border-radius:10px;">
        <p style="margin:0;font-size:13px;line-height:1.7;color:#0c4a6e;">
          Typical response time: within 1 business day.
        </p>
      </div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;border-collapse:separate;border-spacing:0;">
        ${detailRow("Company", company)}
        ${detailRow("Phone", phone || "Not provided")}
        ${detailRow("Your Message", message)}
      </table>
      <p style="margin:16px 0 0 0;font-size:14px;line-height:1.7;color:#334155;">
        Regards,<br>
        <span style="color:${brandPrimary};font-weight:700;">Sterivio Team</span>
      </p>
    `
  );
}

function validatePayload(body: unknown): { valid: true; data: RequestQuotePayload } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request payload." };
  }

  const data = body as Record<string, unknown>;
  const payload: RequestQuotePayload = {
    name: normalize(data.name),
    company: normalize(data.company),
    email: normalize(data.email),
    phone: normalize(data.phone),
    message: normalize(data.message),
  };

  if (!payload.name || !payload.company || !payload.email || !payload.message) {
    return { valid: false, error: "Please complete all required fields." };
  }

  if (!EMAIL_REGEX.test(payload.email)) {
    return { valid: false, error: "Please enter a valid email address." };
  }

  if (payload.message.length > 5000) {
    return { valid: false, error: "Message is too long." };
  }

  return { valid: true, data: payload };
}

export async function POST(request: Request) {
  if (!resendApiKey || !quoteReceiverEmail) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const result = validatePayload(body);
  if (!result.valid) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { name, company, email, phone, message } = result.data;
  const resend = new Resend(resendApiKey);

  try {
    const internalEmailHtml = buildInternalEmailHtml(result.data);
    const confirmationEmailHtml = buildConfirmationEmailHtml(result.data);

    await resend.emails.send({
      from: fromEmail,
      to: [quoteReceiverEmail],
      replyTo: email,
      subject: `New Quote Request from ${name}`,
      text: [
        "A new quote request was submitted:",
        "",
        `Name: ${name}`,
        `Company: ${company}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: internalEmailHtml,
    });

    await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: "We received your request",
      text: [
        `Hi ${name},`,
        "",
        "Thanks for contacting Sterivio. We have received your quote request and our team will get back to you soon.",
        "",
        "Submitted details:",
        `Company: ${company}`,
        `Phone: ${phone || "Not provided"}`,
        "",
        "Your message:",
        message,
        "",
        "Best regards,",
        "Sterivio Team",
      ].join("\n"),
      html: confirmationEmailHtml,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}