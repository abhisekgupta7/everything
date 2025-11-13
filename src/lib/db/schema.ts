import { pgTable, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel,InferInsertModel } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),

  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),

  image: varchar("image", { length: 512 }), // optional (nullable)
  customerID: varchar("customer_id", { length: 255 }).unique(),
  priceId: varchar("price_id", { length: 255 }),

  status: varchar("status", { length: 50 }).notNull().default("free"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const summariesTable = pgTable("summaries", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  originFileUrl: varchar("origin_file_url", { length: 512 }).notNull(),
  summaryText: varchar("summary_text").notNull(),
  status: varchar("status", { length: 50 }).notNull().default("processing"),
  title: varchar("title", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const paymentsTable = pgTable("payments", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 10 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  paymentIntentId: varchar("payment_intent_id", { length: 255 }).notNull(),
  priceId: varchar("price_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export type User = InferSelectModel<typeof usersTable>; 
export type NewUser = InferInsertModel<typeof usersTable>;

export type Summary = InferSelectModel<typeof summariesTable>;  
export type NewSummary = InferInsertModel<typeof summariesTable>;

export type Payment = InferSelectModel<typeof paymentsTable>;
export type NewPayment = InferInsertModel<typeof paymentsTable>;

