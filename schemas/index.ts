import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(
    z.string().min(6, {
      message: "Code is required",
    })
  ),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password is missing or too short",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password is missing or too short",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // point to the field that caused the error
  });

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.USER, UserRole.ADMIN]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required to update new password",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "New Password is required to update  password",
      path: ["newPassword"],
    }
  );
