import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "./constants";
const geminiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export async function extractSummaryFromGemini(
  pdfText: string
): Promise<string> {
  try {
    console.log(
      "Calling Gemini with API key:",
      process.env.GEMINI_API_KEY ? "Key exists" : "Key missing"
    );
    const model = geminiClient.getGenerativeModel({
      model: "gemini-2.5-flash",
    });
    const prompt = `${SUMMARY_SYSTEM_PROMPT}\n\n${pdfText}`;
    const response = await model.generateContent(prompt);
    const summary = response.response.text();
    if (!summary) {
      throw new Error("No summary generated");
    }
    return summary;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    if (error.code === 429 || error.message.includes("Rate limit exceeded")) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    throw error;
  }
}
