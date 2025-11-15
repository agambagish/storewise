import { Resend } from "resend";

import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

interface SendEmailProps {
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail({ to, subject, text }: SendEmailProps) {
  if (env.NODE_ENV === "development") {
    // biome-ignore lint/suspicious/noConsole: _
    console.log(text);
    return;
  }

  return await resend.emails.send({
    from: "Storewise <onboarding@resend.dev>",
    to,
    subject,
    text,
  });
}

interface GenerateEmailProps {
  name: string;
  url: string;
}

export function generateVerifyEmail({ name, url }: GenerateEmailProps) {
  return `Verify your email on Storewise

Hello ${name},

Thanks for signing up with Storewise.
To complete your registration, please verify your email address.

Click the link below to verify your email:

${url}

If you didn't create an account with Storewise, you can safely ignore this message.

Best,
The Storewise Team`;
}

export function generateResetPasswordEmail({ name, url }: GenerateEmailProps) {
  return `Reset your password on Storewise

Hello, ${name},

We received a request to reset your password for Storewise.
If you made this request, click the link below to set a new password:

${url}

If you didn't request a password reset, you can safely ignore this message. Your account will remain secure.

Best,
The Storewise Team`;
}
