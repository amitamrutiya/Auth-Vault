"use server";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";

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
