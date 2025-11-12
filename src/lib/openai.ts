import { OpenAI } from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "./constants";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export async function extractSummaryFromOpenAi(pdfText: string) {
  try {
    console.log(
      "Calling OpenAI with API key:",
      process.env.OPENAI_API_KEY ? "Key exists" : "Key missing"
    );
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SUMMARY_SYSTEM_PROMPT },
        { role: "user", content: pdfText },
      ],
      temperature: 0.7,
    });

    const summary = response.choices[0]?.message?.content || "";
    if (!summary) {
      throw new Error("No summary generated");
    }
    return summary;
  } catch (error: unknown) {
    const err = error as {
      status?: number;
      message?: string;
     
    };
    console.error("OpenAI API Error:", err);
    console.error("Error status:", err.status);
    console.error("Error message:", err.message);
    if (err.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    throw error;
  }
}
