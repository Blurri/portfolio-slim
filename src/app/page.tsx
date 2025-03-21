"use client"

import { useState } from "react"
import { ArrowRight, Briefcase, Code, Github, Mail, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/language-context"
import { useProjects } from "@/data/projects-data"

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("all")
  const { t } = useLanguage()
  const projects = useProjects()

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section data-section-title={t("about.title")} className="mb-16">
        <div className="neu-flat dark:dark-neu-flat rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1">
              <h1
                data-section-title={t("hero.title")}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-2"
              >
                {t("hero.title")}
              </h1>
              <h2 className="text-xl md:text-2xl text-purple-600 dark:text-purple-400 mb-4">{t("hero.subtitle")}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{t("hero.description")}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="neu-button dark:dark-neu-button px-6 py-3 rounded-xl text-gray-800 dark:text-gray-100 font-medium flex items-center gap-2"
                >
                  {t("hero.contact")} <ArrowRight size={18} />
                </a>
                <a
                  href="#projects"
                  className="neu-button dark:dark-neu-button px-6 py-3 rounded-xl text-gray-800 dark:text-gray-100 font-medium"
                >
                  {t("hero.projects")}
                </a>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-48 h-48 md:w-64 md:h-64 neu-circle dark:dark-neu-circle rounded-full flex items-center justify-center overflow-hidden">
                <User size={80} className="text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="mb-16">
        <h2
          data-section-title={t("about.title")}
          className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6"
        >
          {t("about.title")}
        </h2>
        <div className="neu-flat dark:dark-neu-flat rounded-2xl p-6 md:p-8">
          <p className="text-gray-600 dark:text-gray-300 mb-4">{t("about.p1")}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{t("about.p2")}</p>
          <p className="text-gray-600 dark:text-gray-300 mb-8">{t("about.p3")}</p>

          {/* AI Enthusiasm Section */}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text">
              {t("about.ai.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{t("about.ai.p1")}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{t("about.ai.p2")}</p>
            <p className="text-gray-600 dark:text-gray-300">{t("about.ai.p3")}</p>
          </div>
        </div>
      </section>

      {/* Key Technologies Section */}
      <section id="technologies" className="mb-16">
        <h2
          data-section-title={t("technologies.title")}
          className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6"
        >
          {t("technologies.title")}
        </h2>
        <div className="neu-flat dark:dark-neu-flat rounded-2xl p-6 md:p-8">
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="neu-tag dark:dark-neu-tag rounded-full px-4 py-2 text-sm flex items-center justify-center transition-all hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${tech.color1}, ${tech.color2})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 500,
                }}
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Projects Section */}
      <section id="projects" className="mb-16">
        <h2
          data-section-title={t("projects.title")}
          className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6"
        >
          {t("projects.title")}
        </h2>

        {/* Project Tabs */}
        <div className="mb-8 flex flex-wrap gap-4">
          {[
            { id: "all", label: t("projects.all") },
            { id: "web", label: t("projects.web") },
            { id: "mobile", label: t("projects.mobile") },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-6 py-3 rounded-xl flex items-center gap-2 transition-all",
                activeTab === tab.id
                  ? "neu-pressed dark:dark-neu-pressed text-purple-600 dark:text-purple-400"
                  : "neu-button dark:dark-neu-button text-gray-700 dark:text-gray-300",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects
            .filter((project) => activeTab === "all" || project.type === activeTab)
            .map((project, index) => (
              <div key={index} className="neu-flat dark:dark-neu-flat rounded-2xl overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => {
                      const techObj = technologies.find((t) => t.name === tech) || {
                        color1: "#8b5cf6",
                        color2: "#6366f1",
                      }

                      return (
                        <span
                          key={techIndex}
                          className="neu-tag dark:dark-neu-tag rounded-full px-3 py-1 text-sm transition-all hover:scale-105"
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${techObj.color1}, ${techObj.color2})`,
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontWeight: 500,
                          }}
                        >
                          {tech}
                        </span>
                      )
                    })}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    <strong>{t("projects.role")}:</strong> {project.role}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Professional Experience Section */}
      <section id="experience" className="mb-16">
        <h2
          data-section-title={t("experience.title")}
          className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6"
        >
          {t("experience.title")}
        </h2>
        <div className="neu-flat dark:dark-neu-flat rounded-2xl p-6 md:p-8">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-900"></div>

            {[
              {
                period: "2016 - 2025",
                role: "Software Engineer",
                company: "Panter AG",
                description:
                  "Led development of various web and mobile applications using React, React Native, and Node.js.",
              },
              {
                period: "2014 - 2016",
                role: "Software Engineer",
                company: "PM Medici",
                description: "Developed web applications and maintained existing systems.",
              },
              {
                period: "2013 - 2014",
                role: "Software Engineer",
                company: "DWA AG",
                description: "Worked on frontend development and client-side applications.",
              },
              {
                period: "2012 - 2013",
                role: "Intern",
                company: "Rucotec",
                description: "Assisted in software development and learned industry practices.",
              },
            ].map((job, index) => (
              <div key={index} className="relative pl-10 pb-8">
                <div className="absolute left-2 top-1 w-5 h-5 rounded-full neu-circle dark:dark-neu-circle flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
                <div className="mb-1 text-sm text-purple-600 dark:text-purple-400 font-medium">{job.period}</div>
                <h3
                  data-section-title={job.role}
                  className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1"
                >
                  {job.role} at {job.company}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{job.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mb-16">
        <h2
          data-section-title={t("contact.title")}
          className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6"
        >
          {t("contact.title")}
        </h2>
        <div className="neu-flat dark:dark-neu-flat rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{t("contact.getInTouch")}</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t("contact.name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 neu-pressed dark:dark-neu-pressed rounded-xl bg-transparent outline-none text-gray-800 dark:text-gray-200"
                    placeholder={t("contact.name")}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t("contact.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 neu-pressed dark:dark-neu-pressed rounded-xl bg-transparent outline-none text-gray-800 dark:text-gray-200"
                    placeholder={t("contact.email")}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 neu-pressed dark:dark-neu-pressed rounded-xl bg-transparent outline-none text-gray-800 dark:text-gray-200"
                    placeholder={t("contact.message")}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="neu-button dark:dark-neu-button px-6 py-3 rounded-xl text-gray-800 dark:text-gray-100 font-medium flex items-center gap-2"
                >
                  {t("contact.send")} <ArrowRight size={18} />
                </button>
              </form>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                {t("contact.connectWithMe")}
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 neu-circle dark:dark-neu-circle rounded-full flex items-center justify-center">
                    <Mail size={24} className="text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                    <a
                      href="mailto:contact@example.com"
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      contact@example.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 neu-circle dark:dark-neu-circle rounded-full flex items-center justify-center">
                    <Github size={24} className="text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">GitHub</div>
                    <a
                      href="https://github.com/username"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      github.com/username
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 neu-circle dark:dark-neu-circle rounded-full flex items-center justify-center">
                    <Briefcase size={24} className="text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</div>
                    <a
                      href="https://linkedin.com/in/username"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      linkedin.com/in/username
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 neu-circle dark:dark-neu-circle rounded-full flex items-center justify-center">
                    <Code size={24} className="text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Portfolio</div>
                    <a
                      href="https://portfolio.example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      portfolio.example.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-600 dark:text-gray-400 pb-8">
        <p>{t("footer.copyright").replace("{year}", new Date().getFullYear().toString())}</p>
      </footer>
    </div>
  )
}

// Technology data with color gradients
const technologies = [
  { name: "React", color1: "#61dafb", color2: "#2d8bba" },
  { name: "React Native", color1: "#61dafb", color2: "#0088cc" },
  { name: "Next.js", color1: "#000000", color2: "#666666" },
  { name: "Node.js", color1: "#68a063", color2: "#3c873a" },
  { name: "GraphQL", color1: "#e535ab", color2: "#a424a5" },
  { name: "Tailwind", color1: "#38bdf8", color2: "#0ea5e9" },
  { name: "TypeScript", color1: "#3178c6", color2: "#235a97" },
  { name: "PostgreSQL", color1: "#336791", color2: "#0064a5" },
  { name: "MongoDB", color1: "#13aa52", color2: "#006548" },
  { name: "Google Cloud", color1: "#4285f4", color2: "#34a853" },
  { name: "OpenAI", color1: "#10a37f", color2: "#0e8a6d" },
  { name: "LangChain", color1: "#00a3e0", color2: "#0077b5" },
  { name: "AI Agents", color1: "#8b5cf6", color2: "#6366f1" },
  { name: "LLMs", color1: "#3b82f6", color2: "#2563eb" },
  { name: "RAG", color1: "#ec4899", color2: "#db2777" },
]

