import React, { useState } from "react";
import EmptyState from "./EmptyState.jsx";

export default function ResultsView({ quizzes, results }) {
  const [filterQuiz, setFilterQuiz] = useState("all");

  const rows = results
    .filter((r) => filterQuiz === "all" || r.quizId === filterQuiz)
    .filter((r) => quizzes.some((q) => q.id === r.quizId));

  if (quizzes.length === 0) {
    return <EmptyState text="Publish a quiz first — results will show up here once students take it." />;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xs font-semibold uppercase tracking-wide opacity-60">Filter by quiz</span>
        <select
          value={filterQuiz}
          onChange={(e) => setFilterQuiz(e.target.value)}
          className="px-3 py-1.5 rounded-lg border text-sm outline-none"
          style={{ borderColor: "var(--ledger)" }}
        >
          <option value="all">All quizzes</option>
          {quizzes.map((q) => (
            <option key={q.id} value={q.id}>
              {q.title}
            </option>
          ))}
        </select>
      </div>

      {rows.length === 0 ? (
        <EmptyState text="No attempts recorded yet for this selection." />
      ) : (
        <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--ledger)", background: "var(--card)" }}>
          <div
            className="grid grid-cols-4 px-5 py-3 text-xs font-semibold uppercase tracking-wide opacity-50"
            style={{ background: "var(--paper)" }}
          >
            <span>Student</span>
            <span>Quiz</span>
            <span>Score</span>
            <span>Date</span>
          </div>
          {rows.map((r) => {
            const quiz = quizzes.find((q) => q.id === r.quizId);
            const pct = Math.round((r.score / r.total) * 100);
            return (
              <div key={r.id} className="ledger-row grid grid-cols-4 px-5 py-3 text-sm items-center">
                <span className="font-semibold" style={{ color: "var(--ink)" }}>
                  {r.studentName}
                </span>
                <span className="opacity-70">{quiz ? quiz.title : "—"}</span>
                <span className="font-mono flex items-center gap-2">
                  {r.score}/{r.total}
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: pct >= 60 ? "#E7F3EC" : "#FBE9E4", color: pct >= 60 ? "#2E7D4F" : "var(--coral)" }}
                  >
                    {pct}%
                  </span>
                </span>
                <span className="opacity-50 font-mono text-xs">{r.submittedAt}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
