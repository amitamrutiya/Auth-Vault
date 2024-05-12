"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";

export async function settings(values: z.infer<typeof SettingsSchema>) {
  const data = SettingsSchema.safeParse(values);

  if (!data) {
    return { success: false, message: "Enter valid details" };
  }

  const user = await currentUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in to update your settings",
    };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return {
      success: false,
      message: "User not found",
    };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return {
        success: false,
        message: "Email already exists!",
      };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(values.email, verificationToken.token);

    return {
      success: true,
      message: "Verification email sent! Please verify your email address",
    };
  }

  if (values.password && !values.newPassword) {
    return {
      success: false,
      message: "New password is required",
    };
  }

  if (values.newPassword && !values.password) {
    return {
      success: false,
      message: "Current password is required",
    };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) {
      return {
        success: false,
        message: "Current password is incorrect",
      };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      ...data?.data,
    },
  });

  return {
    success: true,
    message: "Settings updated successfully",
  };
}
