import { TwoFactorToken } from "@prisma/client";
import { db } from "../lib/db";

export async function getTwoFactorTokenByToken(
  token: string
): Promise<TwoFactorToken | null> {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFactorToken;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getTwoFactorTokenByEmail(
  email: string
): Promise<TwoFactorToken | null> {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch (error) {
    console.log(error);
    return null;
  }
}