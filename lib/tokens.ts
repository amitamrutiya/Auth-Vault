import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuid } from "uuid";
import { db } from "./db";

export async function generateVerificationToken(email: string) {
  const token = uuid();
  const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 60 * 1); // 1 hour

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
