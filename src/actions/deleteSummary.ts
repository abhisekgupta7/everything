"use server";

import db from "@/lib/db/index";
import { currentUser } from "@clerk/nextjs/server";
import { summariesTable, usersTable } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteSummary(summaryId: number) {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    // Get the database user ID from Clerk ID
    const dbUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.clerkId, user.id))
      .limit(1);

    if (dbUser.length === 0) {
      return { success: false, error: "User not found in database" };
    }

    const dbUserId = dbUser[0].id;

    // Delete the summary only if it belongs to the user
    const result = await db
      .delete(summariesTable)
      .where(
        and(
          eq(summariesTable.id, summaryId),
          eq(summariesTable.userId, dbUserId)
        )
      );

    // Revalidate the dashboard page to show updated list
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error deleting summary:", error);
    return { success: false, error: "Failed to delete summary" };
  }
}
