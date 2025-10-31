import { Resend } from "resend";

import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

interface Props {
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail({ to, subject, text }: Props) {
  await resend.emails.send({
    from: "verification@resend.dev",
    to,
    subject,
    text,
  });
}
