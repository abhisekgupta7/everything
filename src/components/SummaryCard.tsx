"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2, ExternalLink } from "lucide-react";
import { deleteSummary } from "@/actions/deleteSummary";
import { useState } from "react";
import { toast } from "sonner";

interface SummaryCardProps {
  id: number;
  title: string | null;
  fileName: string;
  createdAt: Date;
}

export default function SummaryCard({
  id,
  title,
  fileName,
  createdAt,
}: SummaryCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this summary?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteSummary(id);
      if (result.success) {
        toast.success("Summary deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete summary");
      }
    } catch (error) {
      toast.error("An error occurred while deleting");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="p-6 h-full flex flex-col justify-between hover:shadow-lg transition-shadow">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900 line-clamp-2">
          {title || "Untitled"}
        </h2>
        <p className="text-sm text-slate-600">{fileName}</p>
        <p className="text-xs text-slate-500">
          {new Date(createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t">
        <Button asChild variant="default" className="flex-1" size="sm">
          <Link
            href={`/summary/${id}`}
            className="inline-flex items-center justify-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            View
          </Link>
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-3"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
