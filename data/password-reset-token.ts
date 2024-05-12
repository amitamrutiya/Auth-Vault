import { db } from "@/lib/db";
import { PasswordResetToken } from "@prisma/client";

export async function getPasswordResetTokenByToken(
  token: string
): Promise<PasswordResetToken | null> {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPasswordResetTokenByEmail(
  email: string
): Promise<PasswordResetToken | null> {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}
