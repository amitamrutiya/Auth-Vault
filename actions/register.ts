"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.message };
  }

  return { success: true, message: "Email sent!" };
}
