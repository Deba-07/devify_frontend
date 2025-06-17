import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(isDark ? "dark" : "light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-gray-300 bg-amber-200 hover:bg-gray-400 transition"
      aria-label="Toggle Theme"
      title="Toggle Theme"
    >
      {isDark ? <Sun className="w-5 h-5 caret-black" /> : <Moon className="w-5 h-5 caret-black" />}
    </button>
  );
};

export default ThemeToggle;
