import React, { useState } from "react";
import { ClipboardList, Award, GraduationCap, ChevronRight } from "lucide-react";
import Header from "./Header.jsx";
import EmptyState from "./EmptyState.jsx";
import TakeQuiz from "./TakeQuiz.jsx";

export default function StudentDashboard({ student, quizzes, results, onSubmitResult, onLogout }) {
  const [tab, setTab] = useState("available"); // available | history
  const [activeQuiz, setActiveQuiz] = useState(null);

  const takenQuizIds = new Set(results.map((r) => r.quizId));

  if (activeQuiz) {
    return (
      <TakeQuiz
        quiz={activeQuiz}
        student={student}
        onExit={() => setActiveQuiz(null)}
        onSubmit={(result) => {
          onSubmitResult(result);
          setActiveQuiz(null);
          setTab("history");
        }}
      />
    );
  }

  return (
    <div>
      <Header name={student.name} roleLabel="Student" icon={<GraduationCap size={16} />} onLogout={onLogout} />

      <div className="px-6 sm:px-10 pt-6">
        <div className="flex gap-6 border-b mb-6" style={{ borderColor: "var(--ledger)" }}>
          {[
            { key: "available", label: "Available Quizzes", icon: ClipboardList },
            { key: "history", label: "My Results", icon: Award },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`tab-underline pb-3 text-sm font-semibold flex items-center gap-1.5 ${tab === key ? "active" : "opacity-40"}`}
              style={{ color: "var(--ink)" }}
            >
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 sm:px-10 pb-16">
        {tab === "available" &&
          (quizzes.length === 0 ? (
            <EmptyState text="No quizzes have been published yet. Check back soon." />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quizzes.map((quiz) => {
                const done = takenQuizIds.has(quiz.id);
                return (
                  <div
                    key={quiz.id}
                    className="rounded-xl p-5 border flex flex-col justify-between"
                    style={{ borderColor: "var(--ledger)", background: "var(--card)" }}
                  >
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wide opacity-50 mb-1">{quiz.subject}</div>
                      <h3 className="font-display text-lg mb-2" style={{ color: "var(--ink)" }}>
                        {quiz.title}
                      </h3>
                      <p className="text-xs opacity-60 mb-4">{quiz.questions.length} questions</p>
                    </div>
                    <button
                      onClick={() => setActiveQuiz(quiz)}
                      disabled={done}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold"
                      style={{
                        background: done ? "var(--paper)" : "var(--amber)",
                        color: done ? "var(--ink-light)" : "var(--ink)",
                        opacity: done ? 0.6 : 1,
                      }}
                    >
                      {done ? (
                        "Already taken"
                      ) : (
                        <>
                          Take test <ChevronRight size={15} />
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}

        {tab === "history" &&
          (results.length === 0 ? (
            <EmptyState text="You haven't taken any quizzes yet." />
          ) : (
            <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--ledger)", background: "var(--card)" }}>
              <div
                className="grid grid-cols-3 px-5 py-3 text-xs font-semibold uppercase tracking-wide opacity-50"
                style={{ background: "var(--paper)" }}
              >
                <span>Quiz</span>
                <span>Score</span>
                <span>Date</span>
              </div>
              {results.map((r) => {
                const quiz = quizzes.find((q) => q.id === r.quizId);
                const pct = Math.round((r.score / r.total) * 100);
                return (
                  <div key={r.id} className="ledger-row grid grid-cols-3 px-5 py-3 text-sm items-center">
                    <span className="font-semibold" style={{ color: "var(--ink)" }}>
                      {quiz ? quiz.title : "—"}
                    </span>
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
          ))}
      </div>
    </div>
  );
}
