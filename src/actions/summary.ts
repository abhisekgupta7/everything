"use server";
import { extractSummaryFromGemini } from "@/lib/geimini";
import { fetchAndExtractPdftext } from "@/lib/langchain";
import { extractSummaryFromOpenAi } from "@/lib/openai";
import db from "@/lib/db";
import { summariesTable, usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type FileData = {
  userId: string;
  pdfUrl: string;
  fileName: string;
  fileSize: number;
  FileKey: string;
};

export default async function extractSummaryFromPdf(
  pdfUrl: string,
  uploadedFile: FileData,
): Promise<string> {
  if (!pdfUrl) {
    throw new Error("Invalid PDF URL");
  }

  const { fileName, userId: clerkUserId } = uploadedFile;

  // Look up user by Clerk ID to get database user ID
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, clerkUserId))
    .limit(1);

  if (!user || user.length === 0) {
    throw new Error("User not found in database");
  }

  const dbUserId = user[0].id;

  const pdfText = await fetchAndExtractPdftext(pdfUrl);
  console.log("Extracted PDF Text:", pdfText);

  try {
    const openAiSummary = await extractSummaryFromOpenAi(pdfText);
    console.log("OpenAI Summary:", openAiSummary);

    if (!openAiSummary) {
      console.error("OpenAI did not return a summary.");
      throw new Error("Failed to generate summary from OpenAI");
    }

    // Save to database
    const result = await db
      .insert(summariesTable)
      .values({
        userId: dbUserId,
        fileName: fileName,
        originFileUrl: pdfUrl,
        summaryText: openAiSummary,
        status: "completed",
        title: fileName.replace(/\.pdf$/i, ""), // Remove .pdf extension for title
      })
      .returning();

    console.log("Summary saved to database:", result[0]?.id);
    return openAiSummary;
  } catch (openAiError) {
    console.error("OpenAI Error:", openAiError);
    try {
      const geminiSummary = await extractSummaryFromGemini(pdfText);
      console.log("Gemini Summary:", geminiSummary);

      if (!geminiSummary) {
        console.error("Gemini did not return a summary.");
        throw new Error("Failed to generate summary from Gemini");
      }

      // Save Gemini summary to database
      const result = await db
        .insert(summariesTable)
        .values({
          userId: dbUserId,
          fileName: uploadedFile.fileName,
          originFileUrl: pdfUrl,
          summaryText: geminiSummary,
          status: "completed",
          title: uploadedFile.fileName.replace(/\.pdf$/i, ""),
        })
        .returning();

      console.log("Gemini summary saved to database:", result[0]?.id);
      return geminiSummary;
    } catch (geminiError) {
      console.error("Gemini Error:", geminiError);
      if (
        geminiError instanceof Error &&
        geminiError.message.includes("Rate limit exceeded")
      ) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      throw new Error("Both OpenAI and Gemini summarization failed.");
    }
  }
}
