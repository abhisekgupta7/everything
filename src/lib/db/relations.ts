import { usersTable } from "./schema"; 
import { summariesTable } from "./schema";
import { paymentsTable } from "./schema";
import { relations } from "drizzle-orm";

export const usersRelations = relations(usersTable, ({ many }) => ({
  summaries: many(summariesTable),
  payments: many(paymentsTable),
}));

export const summariesRelations = relations(summariesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [summariesTable.userId],
    references: [usersTable.id],
  }),
}));
export const paymentsRelations = relations(paymentsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [paymentsTable.userId],
    references: [usersTable.id],
  }),
}));