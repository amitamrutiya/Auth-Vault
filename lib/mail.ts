import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "akamrutiya22102002@gmail.com",
    subject: "Verify your email",
    react: EmailTemplate({ confirmLink }),
    text: `Please verify your email by clicking the link`,
  });

  if (error) {
    console.error(error);
    return;
  }

}

export default sendVerificationEmail;