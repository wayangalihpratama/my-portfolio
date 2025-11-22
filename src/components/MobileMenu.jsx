// src/components/MobileMenu.jsx
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

export default function MobileMenu({ menuItems }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="flex h-16 items-center justify-between">
        {/* Logo/Site Title */}
        <div className="flex-shrink-0">
          <a
            href={import.meta.env.BASE_URL}
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
          >
            [GP]
          </a>
        </div>

        {/* Desktop Navigation Links and Theme Toggle */}
        <div className="flex items-center">
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4 items-center">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={import.meta.env.BASE_URL + item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  {item.name}
                </a>
              ))}
              <ThemeToggle /> {/* <-- ADD THE TOGGLE HERE */}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button and Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle /> {/* <-- ADD THE TOGGLE FOR MOBILE TOO */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-gray-400 dark:hover:text-white"
            aria-expanded={isOpen}
          >
            {/* ... Icon markup (no change) ... */}
            {isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div className={classNames(isOpen ? "block" : "hidden", "sm:hidden")}>
        <div className="space-y-1 px-2 pt-2 pb-3">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={import.meta.env.BASE_URL + item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
