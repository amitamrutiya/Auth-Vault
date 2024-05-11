import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
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
