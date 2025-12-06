"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useUploadThing } from "@/utils/uploadthing";
import { uploadSchema } from "@/lib/constants";
import { Button } from "./ui/button";
import { CheckCircle, Upload, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface UploadFormClientProps {
  uploadLimit: number;
  summaryCount: number;
}

export default function UploadFormClient({
  uploadLimit,
  summaryCount,
}: UploadFormClientProps) {
  const router = useRouter();
  const { startUpload } = useUploadThing("pdfUploader");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate with Zod schema
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
    // Check upload limit
    if (summaryCount >= uploadLimit) {
      toast.error(
        `Upload limit reached (${uploadLimit}). Upgrade your plan for more uploads.`
      );
      router.push("/dashboard");
      return;
    }

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
        const fileData = uploadedFile[0] as any;
        console.log("Uploaded file data:", fileData);

        toast.success(
          "✨ File uploaded — summary will be generated on the server."
        );

        setSelectedFile(null);
        // Reset file input
        const fileInput = document.getElementById(
          "file-input"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";

        // Redirect to dashboard after successful upload
        router.push("/dashboard");
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
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
      <div className="space-y-6">
        {/* Upload limit indicator */}
        <div className="text-sm text-slate-600 text-center">
          Uploads: {summaryCount} / {uploadLimit}
        </div>

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
  );
}
