import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { emptyQuestion } from "../data/seedData.js";

export default function CreateQuiz({ teacherId, onCreateQuiz }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([emptyQuestion()]);
  const [error, setError] = useState("");

  const updateQuestion = (idx, field, value) => {
    setQuestions((prev) => prev.map((q, i) => (i === idx ? { ...q, [field]: value } : q)));
  };
  const updateOption = (qIdx, optIdx, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === qIdx ? { ...q, options: q.options.map((o, j) => (j === optIdx ? value : o)) } : q))
    );
  };
  const addQuestion = () => setQuestions((prev) => [...prev, emptyQuestion()]);
  const removeQuestion = (idx) => setQuestions((prev) => prev.filter((_, i) => i !== idx));

  const submit = () => {
    if (!title.trim() || !subject.trim()) return setError("Give the quiz a title and subject.");
    for (const q of questions) {
      if (!q.q.trim() || q.options.some((o) => !o.trim())) {
        return setError("Every question needs its text and all four options filled in.");
      }
    }
    setError("");
    onCreateQuiz({
      id: "q" + Date.now(),
      title: title.trim(),
      subject: subject.trim(),
      teacherId,
      createdAt: new Date().toISOString().slice(0, 10),
      questions,
    });
  };

  return (
    <div className="max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide opacity-60">Quiz title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Photosynthesis Basics"
            className="w-full mt-1 px-3 py-2 rounded-lg border text-sm outline-none"
            style={{ borderColor: "var(--ledger)" }}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide opacity-60">Subject</label>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Biology"
            className="w-full mt-1 px-3 py-2 rounded-lg border text-sm outline-none"
            style={{ borderColor: "var(--ledger)" }}
          />
        </div>
      </div>

      <div className="space-y-5">
        {questions.map((q, idx) => (
          <div key={idx} className="rounded-xl p-5 border relative" style={{ borderColor: "var(--ledger)", background: "var(--card)" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono opacity-50">Question {idx + 1}</span>
              {questions.length > 1 && (
                <button onClick={() => removeQuestion(idx)} className="opacity-50 hover:opacity-100" style={{ color: "var(--coral)" }}>
                  <Trash2 size={15} />
                </button>
              )}
            </div>
            <input
              value={q.q}
              onChange={(e) => updateQuestion(idx, "q", e.target.value)}
              placeholder="Type the question…"
              className="w-full px-3 py-2 rounded-lg border text-sm outline-none mb-3"
              style={{ borderColor: "var(--ledger)" }}
            />
            <div className="grid sm:grid-cols-2 gap-2">
              {q.options.map((opt, optIdx) => (
                <label
                  key={optIdx}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer"
                  style={{
                    borderColor: q.correct === optIdx ? "var(--amber)" : "var(--ledger)",
                    background: q.correct === optIdx ? "#FCF3E1" : "transparent",
                  }}
                >
                  <input
                    type="radio"
                    name={`correct-${idx}`}
                    checked={q.correct === optIdx}
                    onChange={() => updateQuestion(idx, "correct", optIdx)}
                  />
                  <input
                    value={opt}
                    onChange={(e) => updateOption(idx, optIdx, e.target.value)}
                    placeholder={`Option ${optIdx + 1}`}
                    className="w-full outline-none bg-transparent"
                  />
                </label>
              ))}
            </div>
            <p className="text-xs opacity-40 mt-2">Select the radio button next to the correct answer.</p>
          </div>
        ))}
      </div>

      <button
        onClick={addQuestion}
        className="flex items-center gap-1.5 text-sm font-semibold mt-4 px-3 py-2 rounded-lg border"
        style={{ borderColor: "var(--ledger)", color: "var(--ink)" }}
      >
        <Plus size={15} /> Add another question
      </button>

      {error && (
        <p className="text-sm mt-4" style={{ color: "var(--coral)" }}>
          {error}
        </p>
      )}

      <button
        onClick={submit}
        className="mt-6 px-5 py-2.5 rounded-lg font-semibold text-sm"
        style={{ background: "var(--amber)", color: "var(--ink)" }}
      >
        Publish quiz
      </button>
    </div>
  );
}
