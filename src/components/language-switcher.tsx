"use client";

import { useLanguage } from "@/context/language-context";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <div className="neu-button dark:dark-neu-button rounded-xl overflow-hidden flex text-sm hover:scale-105 active:scale-95 transition-transform">
        <button
          onClick={() => setLanguage("en")}
          className={cn(
            "px-3 py-1.5 transition-colors",
            language === "en"
              ? "neu-pressed dark:dark-neu-pressed text-purple-600 dark:text-purple-400"
              : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
          )}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("de")}
          className={cn(
            "px-3 py-1.5 transition-colors",
            language === "de"
              ? "neu-pressed dark:dark-neu-pressed text-purple-600 dark:text-purple-400"
              : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
          )}
          aria-label="Switch to German"
        >
          DE
        </button>
      </div>
      <div className="w-8 h-8 neu-circle dark:dark-neu-circle rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
        <Languages size={16} className="text-gray-600 dark:text-gray-400" />
      </div>
    </div>
  );
}
