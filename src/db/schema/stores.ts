import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import type { EncryptedData } from "@/lib/encryption";

import { users } from "./users";

export const storeStatusEnum = pgEnum("store_status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

export const storeCashfreeVendorStatusEnum = pgEnum(
  "store_cashfree_vendor_status",
  [
    "IN_BANK_VALIDATION",
    "BANK_VALIDATION_FAILED",
    "IN_BENE_CREATION",
    "BENE_CREATION_FAILED",
    "ACTION_REQUIRED",
    "ACTIVE",
    "ON_HOLD",
    "BLOCKED",
    "DELETED",
  ],
);

export const storeAccountTypeEnum = pgEnum("store_account_type", [
  "INDIVIDUAL",
  "BUSINESS",
]);

export const stores = pgTable("stores", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  description: text(),
  userId: text()
    .notNull()
    .unique()
    .references(() => users.id),
  status: storeStatusEnum().notNull().default("PENDING"),
  accountNumber: jsonb().$type<EncryptedData>().notNull(),
  ifsc: jsonb().$type<EncryptedData>().notNull(),
  accountHoldersName: text().notNull(),
  accountType: storeAccountTypeEnum().notNull(),
  pan: jsonb().$type<EncryptedData>().notNull(),
  gst: jsonb().$type<EncryptedData>(),
  cashfreeVendorId: text().unique(),
  cashfreeVendorStatus: storeCashfreeVendorStatusEnum(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const storesRelations = relations(stores, ({ one }) => ({
  user: one(users, {
    fields: [stores.userId],
    references: [users.id],
  }),
}));

export type Store = typeof stores.$inferSelect;
export type StoreStatus = (typeof storeStatusEnum.enumValues)[number];
export type StoreCashfreeVendorStatus =
  (typeof storeCashfreeVendorStatusEnum.enumValues)[number];
export type StoreAccountType = (typeof storeAccountTypeEnum.enumValues)[number];
