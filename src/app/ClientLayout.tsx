"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { LanguageProvider } from "@/context/language-context";
import LanguageSwitcher from "@/components/language-switcher";
import { useLanguage } from "@/context/language-context";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [currentSection, setCurrentSection] = useState("Welcome");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useLanguage();

  // Set up intersection observer to track visible sections
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-100px 0px -70% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionTitleKey =
            entry.target.getAttribute("data-section-title");
          if (sectionTitleKey) {
            // Show "Welcome" if it's the hero section, otherwise show translated title
            if (
              sectionTitleKey === "hero.title" ||
              sectionTitleKey === "Gabor Raz"
            ) {
              setCurrentSection("Welcome");
            } else {
              const translatedTitle = t(sectionTitleKey);
              setCurrentSection(translatedTitle);
            }
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);

    // Observe all section elements with data-section-title attribute
    const sections = document.querySelectorAll("[data-section-title]");
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [t]);

  const getSectionGradient = (section: string) => {
    switch (section) {
      case "Welcome":
      case "Gabor Raz":
        return "linear-gradient(to right, #8b5cf6, #6366f1)"; // Purple to indigo
      case "About Me":
        return "linear-gradient(to right, #f59e0b, #ef4444)"; // Amber to red
      case "Key Technologies":
        return "linear-gradient(to right, #10b981, #3b82f6)"; // Emerald to blue
      case "Selected Projects":
        return "linear-gradient(to right, #8b5cf6, #ec4899)"; // Purple to pink
      case "Professional Experience":
        return "linear-gradient(to right, #f97316, #ec4899)"; // Orange to pink
      case "Contact":
        return "linear-gradient(to right, #6366f1, #0ea5e9)"; // Indigo to sky
      default:
        return "linear-gradient(to right, #8b5cf6, #6366f1)"; // Default purple to indigo
    }
  };

  // Navigation items
  const navItems = [
    { key: "nav.about", href: "#about" },
    { key: "nav.technologies", href: "#technologies" },
    { key: "nav.projects", href: "#projects" },
    { key: "nav.experience", href: "#experience" },
    { key: "nav.contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 bg-neu-background dark:bg-dark-neu-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-neu-background/98 dark:bg-dark-neu-background/98 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="flex items-center">
                <div className="w-10 h-10 neu-circle dark:dark-neu-circle rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
                    GR
                  </span>
                </div>
              </a>

              {/* Current Section Title with Animation */}
              {currentSection && (
                <div className="ml-3">
                  <div className="h-8 overflow-hidden">
                    <div
                      key={currentSection}
                      className="text-lg font-basic animate-fadeIn"
                      style={{
                        backgroundImage: getSectionGradient(currentSection),
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation:
                          "fadeIn 0.5s ease-in-out, pulse 2s infinite ease-in-out",
                        letterSpacing: "0.02em",
                        fontWeight: 500,
                        lineHeight: 1.4,
                      }}
                    >
                      {currentSection}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {t(item.key)}
                </a>
              ))}
              <div className="flex items-center ml-2">
                <ThemeToggle />
                <div className="ml-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </nav>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center">
              <MobileMenu navItems={navItems} />
              <ThemeToggle />
              <div className="ml-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="pt-20 pb-10 px-4 md:px-8 lg:px-12">{children}</main>
    </div>
  );
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-basic">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="portfolio-theme"
        >
          <LanguageProvider>
            <LayoutContent>{children}</LayoutContent>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

function ThemeToggle() {
  return (
    <button
      className="theme-toggle neu-button dark:dark-neu-button p-2 rounded-xl ml-3 text-gray-700 dark:text-gray-300 hover:scale-105 active:scale-95 transition-transform"
      onClick={() => {
        document.documentElement.classList.toggle("dark");
      }}
      aria-label="Toggle theme"
    >
      <Sun className="hidden dark:block" size={18} />
      <Moon className="block dark:hidden" size={18} />
    </button>
  );
}

function MobileMenu({
  navItems,
}: {
  navItems: { key: string; href: string }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="relative">
      <button
        className="neu-button dark:dark-neu-button p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:scale-105 active:scale-95 transition-transform"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M4 12h16M4 6h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 neu-flat dark:dark-neu-flat rounded-xl shadow-lg z-50">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
              onClick={() => setIsOpen(false)}
            >
              {t(item.key)}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
