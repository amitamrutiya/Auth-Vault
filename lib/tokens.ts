import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuid } from "uuid";
import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-toke";

export async function generateVerificationToken(email: string) {
  const token = uuid();
  const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 60 * 24); // 24 hour

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
  return verificationToken;
}

export async function generatePasswordResetToken(email: string) {
  const token = uuid();
  const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 60 * 24); // 24 hour

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
  return passwordResetToken;
}

export async function generateTwoFactorToken(email: string) {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 5);

  try {
    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
      await db.twoFactorToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const twoFactorToken = await db.twoFactorToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    return twoFactorToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}
