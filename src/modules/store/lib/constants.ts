import type { Path } from "react-hook-form";

import type { StoreSetupSchema } from "../schema/store-setup-schema";

export const ACCOUNT_NUMBER_REGEX = /^\d{9,18}$/;

export const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export const PAN_REGEX = /^[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]$/;

export const GST_REGEX = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/;

export const STORE_SETUP_STEPS = [
  {
    id: 1,
    title: "Store Details",
    description: "Tell us about your store",
    fields: ["name", "description"],
  },
  {
    id: 2,
    title: "Account Verification",
    description: "Verify your identity",
    fields: ["accountType", "pan", "gst"],
  },
  {
    id: 3,
    title: "Payout Setup",
    description: "Configure payment method",
    fields: ["accountNumber", "ifsc", "accountHoldersName"],
  },
  {
    id: 4,
    title: "Review & Submit",
    description: "Confirm your information",
    fields: [],
  },
] satisfies Array<{
  id: number;
  title: string;
  description: string;
  fields: Path<StoreSetupSchema>[];
}>;
