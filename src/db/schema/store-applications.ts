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

import { storeAccountTypeEnum } from "./stores";
import { users } from "./users";

export const storeApplicationStatusEnum = pgEnum("store_application_status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

export const storeApplications = pgTable("store_applications", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  description: text(),
  userId: text()
    .notNull()
    .references(() => users.id),
  status: storeApplicationStatusEnum().notNull().default("PENDING"),
  accountNumber: jsonb().$type<EncryptedData>().notNull(),
  ifsc: jsonb().$type<EncryptedData>().notNull(),
  accountHoldersName: text().notNull(),
  accountType: storeAccountTypeEnum().notNull(),
  pan: jsonb().$type<EncryptedData>().notNull(),
  gst: jsonb().$type<EncryptedData>(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const storeApplicationsRelations = relations(
  storeApplications,
  ({ one }) => ({
    user: one(users, {
      fields: [storeApplications.userId],
      references: [users.id],
    }),
  }),
);

export type StoreApplication = typeof storeApplications.$inferSelect;
export type StoreApplicationStatus =
  (typeof storeApplicationStatusEnum.enumValues)[number];
