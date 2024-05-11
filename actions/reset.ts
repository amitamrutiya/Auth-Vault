"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export async function reset(value: z.infer<typeof ResetSchema>) {
  const validatedFields = ResetSchema.safeParse(value);
  if (!validatedFields.success) {
    return { success: false, message: "Invalid email address" };
  }

  const user = await getUserByEmail(value.email);
  const passwordResetToken = await generatePasswordResetToken(value.email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  if (user) {
    return { success: true, message: "Reset link sent to your email" };
  } else {
    return { success: false, message: "User not found" };
  }
}
