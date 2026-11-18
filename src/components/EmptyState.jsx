import React from "react";

export default function EmptyState({ text }) {
  return (
    <div
      className="rounded-xl border border-dashed p-10 text-center text-sm opacity-50"
      style={{ borderColor: "var(--ledger)" }}
    >
      {text}
    </div>
  );
}
