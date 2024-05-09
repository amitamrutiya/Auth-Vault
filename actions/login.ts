"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { defaultLoginRedirect } from "@/route";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { userAgent } from "next/server";
import { generateVerificationToken } from "@/lib/tokens";

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, message: validatedFields.error.message };
  }
  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.password || !existingUser.password) {
    return { success: false, error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);

    return {
      success: true,
      message: "Email not verified. Verification email sent!",
    };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: defaultLoginRedirect,
    });
    return { success: true, message: "Email sent!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "OAuthSignInError":
          return { success: false, message: "OAuth sign in not supported" };
        case "OAuthCallbackError":
          return { success: false, message: "OAuth callback not supported" };
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials" };
        default:
          return { success: false, message: "An unknown error occurred" };
      }
    }
    throw error;
  }
}
