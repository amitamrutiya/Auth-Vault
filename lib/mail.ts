import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "auth@studynotion.store",
    to: [email],
    subject: "Verify your email",
    react: EmailTemplate({ confirmLink }),
    text: `Please verify your email by clicking the link`,
  });

  if (error) {
    console.error(error);
    return;
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "auth@studynotion.store",
    to: [email],
    subject: "Reset your password",
    react: EmailTemplate({ resetLink }),
    text: `Please reset your password by clicking the link`,
  });

  if (error) {
    console.error(error);
    return;
  }
}

export async function sendTwoFactorEmail(email: string, token: string) {
  const { error } = await resend.emails.send({
    from: "auth@studynotion.store",
    to: [email],
    subject: "Two-factor authentication",
    react: EmailTemplate({ token }),
    text: `Your two-factor authentication code is here`,
  });

  if (error) {
    console.error(error);
    return;
  }
}
