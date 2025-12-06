import { Button } from "./ui/button";
import { CheckCircle, Upload, Loader2 } from "lucide-react";

interface UploadFormProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => Promise<void>;
  selectedFile: File | null;
  isUploading: boolean;
}

export default function UploadForm({
  handleFileChange,
  handleUpload,
  selectedFile,
  isUploading,
}: UploadFormProps) {
  return (
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
  );
}
