import React, { useState } from "react";
import { School, GraduationCap, PenSquare, Mail, Lock } from "lucide-react";

export default function LoginScreen({ users, onLogin }) {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setError("Enter your email to continue.");
      return;
    }
    const match = users.find(
      (u) => u.role === role && u.email.toLowerCase() === trimmedEmail && u.password === password
    );
    if (!match) {
      setError("Those credentials don't match our roll call. Try again.");
      return;
    }
    setError("");
    onLogin(match);
  };

  const demo =
    role === "teacher"
      ? [{ u: "rao@chalkline.edu", p: "teach123" }, { u: "iyer@chalkline.edu", p: "teach123" }]
      : [
          { u: "asha@chalkline.edu", p: "learn123" },
          { u: "vikram@chalkline.edu", p: "learn123" },
          { u: "meera@chalkline.edu", p: "learn123" },
        ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-4xl grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl"
        style={{ background: "var(--card)" }}
      >
        {/* Left: brand panel */}
        <div className="hidden md:flex flex-col justify-between p-10" style={{ background: "var(--ink)", color: "var(--chalk-white)" }}>
          <div className="flex items-center gap-2">
            <School size={26} style={{ color: "var(--amber)" }} />
            <span className="font-display text-xl tracking-wide">Chalkline</span>
          </div>
          <div>
            <p className="font-display text-4xl leading-tight mb-4">
              Roll call.
              <br />
              Quiz on.
              <br />
              Grades in.
            </p>
            <p className="text-sm opacity-70 leading-relaxed">
              One ledger for the classroom — teachers set the questions, students take their seats, results land
              where everyone can see them.
            </p>
          </div>
          <p className="text-xs opacity-50 font-mono">est. today, in your browser</p>
        </div>

        {/* Right: form */}
        <div className="p-8 sm:p-10">
          <div className="flex gap-6 mb-8 border-b" style={{ borderColor: "var(--ledger)" }}>
            {["student", "teacher"].map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  setError("");
                }}
                className={`tab-underline pb-3 text-sm font-semibold capitalize ${role === r ? "active" : "opacity-40"}`}
                style={{ color: "var(--ink)" }}
              >
                {r === "student" ? (
                  <span className="flex items-center gap-1.5">
                    <GraduationCap size={16} />
                    Student
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <PenSquare size={16} />
                    Teacher
                  </span>
                )}
              </button>
            ))}
          </div>

          <h2 className="font-display text-2xl mb-1" style={{ color: "var(--ink)" }}>
            Sign in
          </h2>
          <p className="text-sm mb-6 opacity-60">Enter your {role} credentials to continue.</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide opacity-60">Email</label>
              <div className="flex items-center gap-2 mt-1 px-3 py-2 rounded-lg border" style={{ borderColor: "var(--ledger)" }}>
                <Mail size={16} className="opacity-40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none bg-transparent text-sm"
                  placeholder="e.g. asha@chalkline.edu"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide opacity-60">Password</label>
              <div className="flex items-center gap-2 mt-1 px-3 py-2 rounded-lg border" style={{ borderColor: "var(--ledger)" }}>
                <Lock size={16} className="opacity-40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none bg-transparent text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm" style={{ color: "var(--coral)" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg font-semibold text-sm mt-2 transition-transform active:scale-[0.98]"
              style={{ background: "var(--amber)", color: "var(--ink)" }}
            >
              Enter classroom
            </button>
          </form>

          <div className="mt-6 p-3 rounded-lg text-xs font-mono" style={{ background: "var(--paper)", color: "var(--ink-light)" }}>
            Demo {role} logins:
            {demo.map((d) => (
              <div key={d.u}>
                {d.u} / {d.p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
