"use client";

import ReactMarkdown from "react-markdown";

export default function ProductDescription({
  description,
}: {
  description: string;
}) {
  return (
    <div className="prose prose-sm max-w-none text-text-muted">
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
  );
}
