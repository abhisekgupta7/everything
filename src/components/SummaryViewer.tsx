"use client";
import { Card, CardContent, CardTitle, CardHeader } from "./ui/card";
import NavigationControls from "./NavigationControls";
import ProgressBar from "./ProgressBar";
import { Sparkles } from "lucide-react";
import { useState } from "react";
// Parse the whole summary into sections by headings (#).
const parseSections = (text: string) => {
  const normalized = text.replace(/\r/g, "");

  // If no headings, return whole text as a single section
  if (!/^\s*#/m.test(normalized)) {
    return {
      intro: null as string | null,
      sections: [{ title: "Summary", body: normalized }],
    };
  }

  // Extract intro (before first heading)
  const firstHeadingIndex = normalized.search(/(^|\n)\s*#/m);
  const intro =
    firstHeadingIndex > 0
      ? normalized.slice(0, firstHeadingIndex).trim()
      : null;

  const headingRe = /(^|\n)(#+)\s*(.+)\n([\s\S]*?)(?=(?:\n#+\s)|$)/g;
  const sections: { title: string; body: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = headingRe.exec(normalized)) !== null) {
    const rawTitle = m[3] || "Untitled";
    const body = (m[4] || "").trim();
    sections.push({ title: rawTitle.trim(), body });
  }

  return { intro: intro && intro.length ? intro : null, sections };
};

const extractPoints = (body: string) => {
  const lines = body.split("\n").map((l) => l.replace(/\r/g, "").trim());
  const points: string[] = [];
  let current: string | null = null;

  for (const line of lines) {
    if (!line) {
      if (current) {
        points.push(current.trim());
        current = null;
      }
      continue;
    }

    if (/^(?:[*\-•]|\d+\.)\s+/.test(line)) {
      if (current) points.push(current.trim());
      current = line.replace(/^(?:[*\-•]|\d+\.)\s+/, "");
    } else {
      if (current) current += " " + line;
      else current = line;
    }
  }

  if (current) points.push(current.trim());
  return points.filter((p) => p && !p.startsWith("[Choose"));
};
export default function SummaryViewer({
  summary,
  wordcount,
}: {
  summary: string;
  wordcount?: number;
}) {
  const [currentSection, setcurrentSection] = useState(0);

  // compute word count locally if not provided
  const computedWordCount =
    typeof wordcount === "number"
      ? wordcount
      : summary.split(/\s+/).filter((t) => t && t.length > 0).length;

  const parsed = parseSections(summary);
  const sections = parsed.sections.map((s) => ({
    title: s.title,
    points: extractPoints(s.body),
  }));
  return (
    <div>
      <div className="relative mb-3">
        <div className="absolute right-4 top-0">
          <span className="text-sm text-slate-500 px-2 py-1">
            {computedWordCount} words
          </span>
        </div>
        <div className="pt-6">
          <ProgressBar
            current={currentSection + 1}
            total={sections.length}
            onSelect={(i) => setcurrentSection(i - 1)}
            showIndex={false}
            height={10}
          />
        </div>
      </div>

      <Card className="h-[560px] flex flex-col">
        <CardHeader>
          <div className="w-full flex items-center justify-center">
            <div className="inline-flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-indigo-500" />
              <div className="text-center">
                <CardTitle className="text-center">
                  {sections[currentSection].title}
                </CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto pb-6">
          {parsed.intro && currentSection === 0 ? (
            <div className="mb-4 text-sm text-slate-600 whitespace-pre-wrap">
              {parsed.intro}
            </div>
          ) : null}

          <ul className="list-disc pl-5 space-y-2 mb-4">
            {sections[currentSection].points.map((p, i) => (
              <li key={i} className="text-sm text-slate-700 textsize-base leading-6">
                {p}
              </li>
            ))}
          </ul>
        </CardContent>

        {/* Footer: fixed bottom in the card via flex layout */}
        <div className="p-4 bg-white border-t transform -translate-y-32">
          <div className="max-w-full mx-auto flex items-center gap-4">
            <NavigationControls
              current={currentSection + 1}
              total={sections.length}
              onPrev={() => setcurrentSection((prev) => Math.max(prev - 1, 0))}
              onNext={() =>
                setcurrentSection((prev) =>
                  Math.min(prev + 1, sections.length - 1)
                )
              }
              onSelect={(index: number) => setcurrentSection(index - 1)}
              compact
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
