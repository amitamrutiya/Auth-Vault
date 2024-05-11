"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import * as zod from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function newPassword(
  value: zod.infer<typeof NewPasswordSchema>,
  token?: string | null
) {
  if (!token) {
    return { success: false, message: "Missing token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(value);
  if (!validatedFields.success) {
    return { success: false, message: "Invalid password!" };
  }

  const { password, confirmPassword } = value;

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match!" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { success: false, message: "Invalid token!" };
  }

  const hasExpired = new Date() > existingToken.expiresAt;

  if (hasExpired) {
    return { success: false, message: "Token expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { success: false, message: "User not found!" };
  }

  // match with previous password
  const previousPasswordMatch = await bcrypt.compare(
    password,
    existingUser.password!
  );
  if (previousPasswordMatch) {
    return {
      success: false,
      message: "Password must be different from the previous one!",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: true, message: "Password updated!" };
}
