"use client";

export default function CurrentDate() {
  return (
    <span
      className="text-sm text-muted-foreground hidden md:block"
      suppressHydrationWarning
    >
      {new Date().toLocaleDateString("en-PK", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
  );
}
