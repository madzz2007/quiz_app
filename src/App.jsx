import React, { useState } from "react";
import { SEED_USERS, SEED_QUIZZES, SEED_RESULTS } from "./data/seedData.js";
import LoginScreen from "./components/LoginScreen.jsx";
import TeacherDashboard from "./components/TeacherDashboard.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";

export default function App() {
  const [users] = useState(SEED_USERS);
  const [quizzes, setQuizzes] = useState(SEED_QUIZZES);
  const [results, setResults] = useState(SEED_RESULTS);
  const [session, setSession] = useState(null); // {id, role, name, email}

  const handleLogin = (user) => setSession(user);
  const handleLogout = () => setSession(null);

  return (
    <div className="min-h-screen w-full" style={{ background: "var(--paper)", fontFamily: "var(--font-body)" }}>
      {!session && <LoginScreen users={users} onLogin={handleLogin} />}

      {session && session.role === "teacher" && (
        <TeacherDashboard
          teacher={session}
          quizzes={quizzes.filter((q) => q.teacherId === session.id)}
          allResults={results}
          onCreateQuiz={(quiz) => setQuizzes((prev) => [...prev, quiz])}
          onLogout={handleLogout}
        />
      )}

      {session && session.role === "student" && (
        <StudentDashboard
          student={session}
          quizzes={quizzes}
          results={results.filter((r) => r.studentId === session.id)}
          onSubmitResult={(r) => setResults((prev) => [...prev, r])}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
