import { getSummaryById } from "@/actions/dataFetch";
import DownloadSummaryButton from "@/components/DownloadSummaryButton";
import { Badge } from "@/components/ui/badge";

import {
  Calendar,
  ChevronLeft,
  Clock,
  Download,
  File,
  FileTextIcon,
  Sparkles,
  Timer,
  TimerIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SummaryViewer from "@/components/SummaryViewer";
import ProgressBar from "@/components/ProgressBar";

type Props = { params: { id: string } };

export default async function SummaryPage({ params }: Props) {
  const idParam = params.id;
  const summaryId = Number(idParam);

  if (Number.isNaN(summaryId)) {
    // Invalid id in URL
    notFound();
  }

  let summary;
  try {
    summary = await getSummaryById(summaryId);
  } catch (err) {
    console.error("Failed to load summary:", err);
    notFound();
  }

  if (!summary) return notFound();

  const content = summary.summaryText || (summary as any).content || "";
  const wordCount = content ? content.split(/\s+/).filter(Boolean).length : 0;
  const readingTime = Math.ceil(wordCount / 200); // Assuming average reading speed of 200 wpm

  const totalSections = Math.max(
    1,
    (content.match(/(^|\n)\s*#/g) || []).length ||
      content.split("\n#").filter(Boolean).length
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-3xl px-4">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
                  {summary.title || "Untitled Summary"}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <Badge className="inline-flex items-center gap-2 bg-slate-100 text-slate-700">
                    <Sparkles className="h-4 w-4" />
                    AI Summary
                  </Badge>
                  <time className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {summary.createdAt
                      ? new Date(summary.createdAt).toLocaleString()
                      : "Unknown date"}
                  </time>
                  <div className="inline-flex items-center gap-1">
                    <Timer className="h-4 w-4" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </div>

              <div className=" flex items-center gap-2">
                <Link href="/dashboard">
                  <Button variant={"outline"} className="hidden md:inline-flex">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                </Link>
                <DownloadSummaryButton summary={summary} />
              </div>
            </div>
          </div>

          <div className="p-6">
            

            <div className="prose prose-slate max-w-none">
              <SummaryViewer summary={content} wordcount={summary.wordCount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
