import { z } from "astro/zod";
import { regex } from "../constants";

function requiredMessage(title: string) {
  return `${title} is Required`;
}

function invalidMessage(title: string) {
  return `Invalid ${title}`;
}

const EmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, requiredMessage("Email"))
    .regex(regex.email, invalidMessage("Email")),
});

export const LoginSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, requiredMessage("Password"))
      .regex(
        regex.password,
        `${invalidMessage(
          "Password"
        )}. Should include Uppercase, Lowercase, Number and Special chars. And should have 8 chars. min and 16 chars. max`
      ),
  })
  .merge(EmailSchema);
export type LoginSchemaT = z.infer<typeof LoginSchema>;
