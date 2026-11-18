import React, { useState } from "react";
import { ClipboardList, Plus, BarChart3, PenSquare } from "lucide-react";
import Header from "./Header.jsx";
import QuizList from "./QuizList.jsx";
import CreateQuiz from "./CreateQuiz.jsx";
import ResultsView from "./ResultsView.jsx";

export default function TeacherDashboard({ teacher, quizzes, allResults, onCreateQuiz, onLogout }) {
  const [tab, setTab] = useState("quizzes"); // quizzes | create | results

  return (
    <div>
      <Header name={teacher.name} roleLabel="Teacher" icon={<PenSquare size={16} />} onLogout={onLogout} />

      <div className="px-6 sm:px-10 pt-6">
        <div className="flex gap-6 border-b mb-6" style={{ borderColor: "var(--ledger)" }}>
          {[
            { key: "quizzes", label: "My Quizzes", icon: ClipboardList },
            { key: "create", label: "Create Quiz", icon: Plus },
            { key: "results", label: "Student Results", icon: BarChart3 },
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
        {tab === "quizzes" && <QuizList quizzes={quizzes} results={allResults} />}
        {tab === "create" && (
          <CreateQuiz
            teacherId={teacher.id}
            onCreateQuiz={(q) => {
              onCreateQuiz(q);
              setTab("quizzes");
            }}
          />
        )}
        {tab === "results" && <ResultsView quizzes={quizzes} results={allResults} />}
      </div>
    </div>
  );
}
