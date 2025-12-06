import db from "../lib/db";
import { usersTable, type User,summariesTable,type Summary } from "../lib/db/schema";
import { eq } from "drizzle-orm";

export async function getUserPriceId(email: string) {
    const query = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email) && eq(usersTable.status, "active"))
        .limit(1);

    if (query.length === 0) {
        throw new Error("User not found");
    }

    return query[0]?.priceId;
}
export async function getUserPlanStatus(email: string) {
    const query = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);
    if (query.length === 0) {
        throw new Error("User not found");
    }   
    return query[0]?.status;
}
export async function getSummaryCount(userId: number) {
    const query = await db
        .select()
        .from(summariesTable)
        .where(eq(summariesTable.userId, userId));
    return query.length;
}
