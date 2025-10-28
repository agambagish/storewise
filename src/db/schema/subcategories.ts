import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

import { categories } from "./categories";

export const subcategories = pgTable("subcategories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  label: text().notNull(),
  slug: text().notNull().unique(),
  categoryId: integer().references(() => categories.id),
});

export const subcategoriesRelations = relations(subcategories, ({ one }) => ({
  category: one(categories, {
    fields: [subcategories.categoryId],
    references: [categories.id],
  }),
}));
