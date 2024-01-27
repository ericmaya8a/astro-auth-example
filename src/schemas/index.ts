import { z } from "astro/zod";
import { regex } from "../constants";

function requiredMessage(title: string) {
  return `${title} is Required`;
}

function invalidMessage(title: string) {
  return `Invalid ${title}`;
}

const EmailValidation = z
  .string()
  .trim()
  .min(1, requiredMessage("Email"))
  .regex(regex.email, invalidMessage("Email"));

const PasswordValidation = z
  .string()
  .trim()
  .min(1, requiredMessage("Password"))
  .regex(
    regex.password,
    `${invalidMessage(
      "Password"
    )}. Should include Uppercase, Lowercase, Number and Special chars. And should have 8 chars. min and 16 chars. max`
  );

export const LoginSchema = z.object({
  email: EmailValidation,
  password: PasswordValidation,
});
export type LoginSchemaT = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().trim().min(1, requiredMessage("Name")),
  email: EmailValidation,
  password: PasswordValidation,
});
export type RegisterSchemaT = z.infer<typeof RegisterSchema>;
