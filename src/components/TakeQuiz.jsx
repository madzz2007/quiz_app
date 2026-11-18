import React, { useState } from "react";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";

export default function TakeQuiz({ quiz, student, onExit, onSubmit }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(quiz.questions.length).fill(null));
  const [finished, setFinished] = useState(false);

  const q = quiz.questions[current];
  const isLast = current === quiz.questions.length - 1;

  const select = (optIdx) => {
    setAnswers((prev) => prev.map((a, i) => (i === current ? optIdx : a)));
  };

  const next = () => {
    if (isLast) {
      const score = answers.reduce((sum, a, i) => sum + (a === quiz.questions[i].correct ? 1 : 0), 0);
      setFinished(true);
      setTimeout(() => {
        onSubmit({
          id: "r" + Date.now(),
          quizId: quiz.id,
          studentId: student.id,
          studentName: student.name,
          score,
          total: quiz.questions.length,
          submittedAt: new Date().toISOString().slice(0, 10),
        });
      }, 1600);
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const score = finished ? answers.reduce((sum, a, i) => sum + (a === quiz.questions[i].correct ? 1 : 0), 0) : 0;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--chalkboard)" }}>
      <div className="flex items-center justify-between px-6 sm:px-10 py-5">
        <span className="font-display text-lg" style={{ color: "var(--chalk-white)" }}>
          {quiz.title}
        </span>
        <button onClick={onExit} className="text-xs font-semibold opacity-60 hover:opacity-100" style={{ color: "var(--chalk-white)" }}>
          Exit without saving
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-10">
        {!finished ? (
          <div className="w-full max-w-xl">
            {/* tally-mark progress */}
            <div className="flex gap-1.5 mb-8 justify-center">
              {quiz.questions.map((_, i) => (
                <span
                  key={i}
                  className="block rounded-sm"
                  style={{
                    width: 6,
                    height: 26,
                    background: i <= current ? "var(--amber)" : "rgba(245,241,230,0.25)",
                    transform: i === current ? "rotate(-6deg)" : "none",
                  }}
                />
              ))}
            </div>

            <p className="font-mono text-xs mb-2" style={{ color: "var(--amber)" }}>
              Question {current + 1} of {quiz.questions.length}
            </p>
            <h2 className="font-display text-2xl mb-6" style={{ color: "var(--chalk-white)" }}>
              {q.q}
            </h2>

            <div className="space-y-3">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => select(idx)}
                  className="w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors"
                  style={{
                    borderColor: answers[current] === idx ? "var(--amber)" : "rgba(245,241,230,0.25)",
                    background: answers[current] === idx ? "rgba(227,167,59,0.15)" : "transparent",
                    color: "var(--chalk-white)",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                disabled={current === 0}
                onClick={() => setCurrent((c) => c - 1)}
                className="flex items-center gap-1 text-sm font-semibold disabled:opacity-30"
                style={{ color: "var(--chalk-white)" }}
              >
                <ChevronLeft size={16} /> Back
              </button>
              <button
                disabled={answers[current] === null}
                onClick={next}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-semibold text-sm disabled:opacity-40"
                style={{ background: "var(--amber)", color: "var(--ink)" }}
              >
                {isLast ? "Submit quiz" : "Next"} <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Award size={48} style={{ color: "var(--amber)" }} className="mx-auto mb-4" />
            <p className="font-display text-3xl mb-2" style={{ color: "var(--chalk-white)" }}>
              You scored {score}/{quiz.questions.length}
            </p>
            <p className="text-sm opacity-60" style={{ color: "var(--chalk-white)" }}>
              Saving to your gradebook…
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
