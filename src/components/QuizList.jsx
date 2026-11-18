import React from "react";
import EmptyState from "./EmptyState.jsx";

export default function QuizList({ quizzes, results }) {
  if (quizzes.length === 0) {
    return <EmptyState text="No quizzes yet. Head to Create Quiz to write your first one." />;
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {quizzes.map((quiz) => {
        const attempts = results.filter((r) => r.quizId === quiz.id);
        return (
          <div key={quiz.id} className="rounded-xl p-5 border" style={{ borderColor: "var(--ledger)", background: "var(--card)" }}>
            <div className="text-xs font-mono uppercase tracking-wide opacity-50 mb-1">{quiz.subject}</div>
            <h3 className="font-display text-lg mb-2" style={{ color: "var(--ink)" }}>
              {quiz.title}
            </h3>
            <div className="flex items-center justify-between text-xs opacity-60">
              <span>{quiz.questions.length} questions</span>
              <span>
                {attempts.length} attempt{attempts.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
