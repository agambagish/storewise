import { integer, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
});

export type User = typeof users.$inferSelect;
