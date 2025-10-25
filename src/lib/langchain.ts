import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
export async function fetchAndExtractPdftext(pdfUrl: string): Promise<string> {
  const response = await fetch(pdfUrl);
  const blob = await response.blob();
  const loader = new PDFLoader(blob);
  const docs = await loader.load();
  const fullText = docs.map((doc) => doc.pageContent).join("\n");
  return fullText;
}
