// src/components/ThemeToggle.jsx
import { useState, useEffect } from "react";

const ThemeToggle = () => {
  // 1. Initialize theme to undefined/null to avoid server access
  const [theme, setTheme] = useState(null);

  // 2. Effect to detect and set the initial theme state (Runs ONLY on the client)
  useEffect(() => {
    const initialTheme = localStorage.getItem("theme");

    if (initialTheme) {
      // Use stored theme if available
      setTheme(initialTheme);
    } else {
      // Fallback to system preference
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    }
  }, []); // Empty dependency array means it runs once after initial mount

  // 3. Effect to apply the theme class to the HTML element whenever the theme state changes
  useEffect(() => {
    if (theme === null) return; // Skip execution until theme is initialized

    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // Update local storage to persist the user's choice
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 4. Toggle function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // 5. Render: Only render the button if the theme has been detected (is not null)
  if (theme === null) {
    return <div className="h-6 w-6"></div>; // Placeholder to prevent layout shift
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="p-2 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition"
    >
      {theme === "light" ? (
        // Sun Icon (Light Mode)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Moon Icon (Dark Mode)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
