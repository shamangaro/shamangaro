const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

interface MailchimpConfig {
  apiKey: string;
  serverPrefix: string;
  audienceId: string;
}

function getMailchimpConfig(): MailchimpConfig | null {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !serverPrefix || !audienceId) return null;
  return { apiKey, serverPrefix, audienceId };
}

async function subscribeViaMailchimp(
  email: string,
  config: MailchimpConfig
): Promise<{ ok: true } | { ok: false; message: string }> {
  const url = `https://${config.serverPrefix}.api.mailchimp.com/3.0/lists/${config.audienceId}/members`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${config.apiKey}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
      tags: ["website-footer"],
    }),
  });

  if (response.ok) return { ok: true };

  const data = (await response.json().catch(() => null)) as {
    title?: string;
    detail?: string;
  } | null;

  if (data?.title === "Member Exists") {
    return { ok: true };
  }

  return {
    ok: false,
    message: data?.detail || data?.title || "Mailchimp subscription failed",
  };
}

async function notifyViaResend(email: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.NEWSLETTER_NOTIFY_EMAIL || "contact@shamangaro.ma";
  const from =
    process.env.RESEND_FROM_EMAIL || "SHAMANGARO <onboarding@resend.dev>";

  if (!apiKey) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [notifyTo],
      subject: "اشتراك جديد — Newsletter SHAMANGARO",
      text: `Email: ${email}\nSource: Footer newsletter\nDate: ${new Date().toISOString()}`,
    }),
  });

  return response.ok;
}

export async function subscribeToNewsletter(
  email: string
): Promise<{ ok: true } | { ok: false; message: string }> {
  const normalized = email.trim().toLowerCase();

  if (!isValidEmail(normalized)) {
    return { ok: false, message: "البريد الإلكتروني غير صالح" };
  }

  const mailchimp = getMailchimpConfig();

  if (mailchimp) {
    const result = await subscribeViaMailchimp(normalized, mailchimp);
    if (result.ok) return { ok: true };
    return result;
  }

  const notified = await notifyViaResend(normalized);
  if (notified) return { ok: true };

  return {
    ok: false,
    message:
      "خدمة الاشتراك غير مهيأة بعد. تواصل معنا عبر واتساب أو البريد الإلكتروني.",
  };
}
