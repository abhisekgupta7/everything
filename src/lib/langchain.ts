// Fallback implementation without langchain community loader
export async function fetchAndExtractPdftext(pdfUrl: string): Promise<string> {
  try {
    // Try dynamic import for langchain
    const { PDFLoader } = await import(
      "@langchain/community/document_loaders/fs/pdf"
    );
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const loader = new PDFLoader(blob);
    const docs = await loader.load();
    const fullText = docs.map((doc) => doc.pageContent).join("\n");
    return fullText;
  } catch (error) {
    console.error("Failed to load PDF with langchain:", error);
    // Fallback: return empty or use pdf-parse directly
    const pdfParse = await import("pdf-parse");
    const response = await fetch(pdfUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const data = await pdfParse.default(buffer);
    return data.text;
  }
}
