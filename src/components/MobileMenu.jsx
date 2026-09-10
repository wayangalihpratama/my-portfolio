// src/components/MobileMenu.jsx
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

export default function MobileMenu({ menuItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 inset-x-0 z-50 mx-auto max-w-5xl px-4 sm:px-6">
      <nav
        className={classNames(
          "flex h-14 items-center justify-between px-4 sm:px-6 rounded-full transition-all duration-300 border",
          isScrolled
            ? "backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-gray-200/80 dark:border-gray-800/80 shadow-xl shadow-blue-500/5"
            : "backdrop-blur-md bg-white/60 dark:bg-gray-900/60 border-gray-200/40 dark:border-gray-800/40 shadow-md"
        )}
      >
        {/* Logo/Site Title */}
        <div className="flex-shrink-0">
          <a
            href={import.meta.env.BASE_URL}
            className="text-lg font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-emerald-400 tracking-tight"
          >
            wgprtm
          </a>
        </div>

        {/* Desktop Navigation Links & Theme Toggle */}
        <div className="flex items-center">
          <div className="hidden sm:block">
            <div className="flex space-x-2 items-center">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all"
                >
                  {item.name}
                </a>
              ))}
              <div className="pl-2 border-l border-gray-200 dark:border-gray-700">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button and Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-gray-800 transition-colors"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="block h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Panel */}
      {isOpen && (
        <div className="mt-2 rounded-2xl backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 shadow-2xl p-4 sm:hidden space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

