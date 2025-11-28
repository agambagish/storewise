import { createInsertSchema } from "drizzle-zod";
import z from "zod";

import { stores } from "@/db/schema";

import {
  ACCOUNT_NUMBER_REGEX,
  GST_REGEX,
  IFSC_REGEX,
  PAN_REGEX,
} from "../lib/constants";

export const storeSetupSchema = createInsertSchema(stores, {
  name: (f) =>
    f
      .min(3, "Must be at least 3 characters long")
      .max(32, "Must be at most 32 characters long"),
  description: (f) =>
    f
      .min(64, "Must be at least 64 characters long")
      .max(120, "Must be at most 120 characters long")
      .nullable()
      .or(z.literal(""))
      .transform((val) => val || null),
  accountHoldersName: (f) => f.nonempty("Can't be empty"),
})
  .omit({
    userId: true,
    accountNumber: true,
    ifsc: true,
    accountType: true,
    pan: true,
    gst: true,
    cfVendorId: true,
    status: true,
  })
  .extend({
    accountNumber: z
      .string()
      .nonempty("Can't be empty")
      .regex(
        ACCOUNT_NUMBER_REGEX,
        "Must be a valid account number (e.g., 1234567890123456)",
      ),
    ifsc: z
      .string()
      .nonempty("Can't be empty")
      .regex(IFSC_REGEX, "Must be a valid IFSC (e.g., CITI0000001)"),
    accountType: z.enum(stores.accountType.enumValues, "Select a valid option"),
    pan: z
      .string()
      .nonempty("Can't be empty")
      .regex(PAN_REGEX, "Must be a valid PAN (e.g., ABCPD1234E)"),
    gst: z
      .string()
      .regex(GST_REGEX, "Must be a valid GST (e.g., 19ABCPD1234E1Z5)")
      .nullable()
      .or(z.literal(""))
      .transform((val) => val || null),
  });

export type StoreSetupSchema = z.infer<typeof storeSetupSchema>;
