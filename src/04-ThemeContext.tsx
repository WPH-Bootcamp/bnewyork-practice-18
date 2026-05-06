import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme harus dipakai di dalam <ThemeProvider>");
  }
  return ctx;
}

function DeepChildButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded-md font-semibold transition ${
        theme === "dark"
          ? "bg-yellow-400 text-slate-900 hover:bg-yellow-300"
          : "bg-slate-900 text-yellow-300 hover:bg-slate-800"
      }`}
    >
      {theme === "dark" ? "☀️ Switch ke Light" : "🌙 Switch ke Dark"}
    </button>
  );
}

function DeepChildLabel() {
  const { theme } = useTheme();
  return (
    <p className="text-sm">
      Theme aktif:{" "}
      <span className="font-mono font-bold text-amber-400">{theme}</span>
    </p>
  );
}

function MiddleLayer({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-3 bg-slate-800 border border-dashed border-slate-600 rounded-md">
      <p className="text-xs text-slate-400 mb-2">
        ↑ MiddleLayer (tidak punya prop theme, tidak peduli theme)
      </p>
      {children}
    </div>
  );
}

function ThemeBoxInside() {
  const { theme } = useTheme();
  return (
    <div
      className={`p-4 rounded-lg transition-colors ${
        theme === "dark"
          ? "bg-slate-900 text-slate-100 border border-slate-600"
          : "bg-amber-50 text-slate-900 border border-amber-300"
      }`}
    >
      <p className="font-bold mb-2">📦 Saya kotak yang ikutan theme</p>
      <DeepChildLabel />
      <div className="mt-3">
        <MiddleLayer>
          <DeepChildButton />
        </MiddleLayer>
      </div>
    </div>
  );
}

export default function ThemeContextDemo() {
  return (
    <ThemeProvider>
      <ThemeBoxInside />
    </ThemeProvider>
  );
}
