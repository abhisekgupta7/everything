"use client";
import { Button } from "@/components/ui/button";
import { uploadSchema } from "@/lib/constants";
import { toast } from "sonner";
import { useUploadThing } from "@/utils/uploadthing";
import { useState } from "react";
import { CheckCircle, Upload, Loader2 } from "lucide-react";

export default function UploadPage() {
  const { startUpload } = useUploadThing("pdfUploader");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate with your Zod schema
    const validation = uploadSchema.safeParse({ pdfFile: file });

    if (!validation.success) {
      const errorMessage =
        validation.error.issues[0]?.message || "Invalid file";
      toast.error(errorMessage);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    toast.success(`Selected: ${file.name}`);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    setIsUploading(true);
    const uploadToastId = toast.loading(`Uploading ${selectedFile.name}...`);

    try {
      const uploadedFile = await startUpload([selectedFile]);
      toast.dismiss(uploadToastId);

      if (uploadedFile?.[0]) {
        toast.success("✅ File uploaded successfully!");
        const fileData = uploadedFile[0] as any; // Type assertion for custom return data
        console.log("Uploaded file data:", fileData);

        // The server will run summary generation in UploadThing's onUploadComplete
        // (server-side). We avoid calling the server action from the client to
        // prevent race conditions where the final `ufsUrl` isn't available yet.
        toast.success(
          "✨ File uploaded — summary will be generated on the server."
        );

        setSelectedFile(null);
        // Reset file input
        const fileInput = document.getElementById(
          "file-input"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      }
    } catch (error) {
      toast.dismiss(uploadToastId);
      toast.error("❌ Upload failed. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          Upload Your PDF
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-lg mx-auto">
          Generate a summary using AI
        </p>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="file-input"
                className="block text-sm font-medium text-slate-700 mb-3"
              >
                Select PDF file
              </label>
              <input
                id="file-input"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
              />
            </div>

            {selectedFile && (
              <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm text-slate-700">
                  Selected: {selectedFile.name}{" "}
                  <span className="text-slate-500">
                    ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </p>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="w-full py-3 bg-slate-900 cursor-pointer hover:bg-slate-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5 text-white" />
                  Upload PDF
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
