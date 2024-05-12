import { db } from "@/lib/db";
import { VerificationToken } from "@prisma/client";

export async function getVerificationTokenByEmail(
  email: string
): Promise<VerificationToken | null> {
  {
    try {
      const verificationToken = await db.verificationToken.findFirst({
        where: {
          email,
        },
      });

      return verificationToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export async function getVerificationTokenByToken(
  token: string
): Promise<VerificationToken | null> {
  {
    try {
      const verificationToken = await db.verificationToken.findUnique({
        where: {
          token,
        },
      });

      return verificationToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
