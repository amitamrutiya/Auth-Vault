"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.message };
  }

  return { success: true, message: "Email sent!" };
}
