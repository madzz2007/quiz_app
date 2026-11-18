import React from "react";
import { School, LogOut } from "lucide-react";

export default function Header({ name, roleLabel, icon, onLogout }) {
  return (
    <div
      className="flex items-center justify-between px-6 sm:px-10 py-5 border-b"
      style={{ borderColor: "var(--ledger)", background: "var(--card)" }}
    >
      <div className="flex items-center gap-2">
        <School size={22} style={{ color: "var(--amber-dark)" }} />
        <span className="font-display text-lg" style={{ color: "var(--ink)" }}>
          Chalkline
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-sm">
          {icon}
          <span className="font-semibold" style={{ color: "var(--ink)" }}>
            {name}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full opacity-60" style={{ background: "var(--paper)" }}>
            {roleLabel}
          </span>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg border hover:opacity-80"
          style={{ borderColor: "var(--ledger)", color: "var(--coral)" }}
        >
          <LogOut size={15} /> Logout
        </button>
      </div>
    </div>
  );
}
