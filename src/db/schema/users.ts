import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const users = pgTable("users", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().default(false).notNull(),
  image: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  role: text(),
  banned: boolean().default(false),
  banReason: text(),
  banExpires: timestamp(),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, "Must be at least 3 characters long")
      .max(48, "Must be at most 48 characters long"),
    email: z.email("Please enter a valid email"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.",
      ),
    confirmPassword: z.string().min(1, "Please confirm password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Please make sure both passwords match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
