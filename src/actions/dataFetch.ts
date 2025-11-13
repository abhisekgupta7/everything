import db from "@/lib/db/index";
import { currentUser } from "@clerk/nextjs/server";
import { summariesTable, usersTable, Summary } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function getSummary() {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");

  const dbUser = await db
    .select()
    .from(usersTable)
        .where(eq(usersTable.clerkId, user.id));
    
    if (dbUser.length === 0) throw new Error("User not found in database");
    
  const dbUserId = dbUser[0].id;
  const userId = user.id;
  const summaries = await db
    .select()
    .from(summariesTable)
    .where(eq(summariesTable.userId, dbUserId));

  return summaries as Summary[];
}
export async function getSummaryById(summaryId: number) {
  const user = await currentUser();
  if (!user) throw new Error("User not authenticated");
  const dbUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, user.id));  
  if (dbUser.length === 0) throw new Error("User not found in database");
  const dbUserId = dbUser[0].id;
  const summary = await db
    .select()
    .from(summariesTable)
    .where(
      and(
        eq(summariesTable.id, summaryId),
        eq(summariesTable.userId, dbUserId)
      )
    )
    .limit(1);  
  
  const wordCount: number = summary[0]?.summaryText
    ? summary[0].summaryText.trim().split(/\s+/).length
    : 0;
  if (summary.length === 0) throw new Error("Summary not found");  
  return { ...summary[0], wordCount } as Summary & { wordCount: number };
}
