"use client";

import { useLanguage } from "@/context/language-context";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  role: string;
  type: string;
}

interface ProjectLanguageData {
  title: string;
  description: string;
  role: string;
}

interface ProjectData {
  en: ProjectLanguageData;
  de: ProjectLanguageData;
  technologies: string[];
  type: string;
}

export function useProjects(): Project[] {
  const { language } = useLanguage();

  const projects: ProjectData[] = [
    {
      en: {
        title: "Dental Practice Management System",
        description:
          "Developed a comprehensive scheduling and patient management system for dental practices. Implemented an intuitive calendar interface with drag-and-drop functionality.",
        role: "Frontend Developer",
      },
      de: {
        title: "Managementsystem für Zahnarztpraxen",
        description:
          "Entwicklung eines umfassenden Termin- und Patientenmanagementsystems für Zahnarztpraxen. Implementierung einer intuitiven Kalenderoberfläche mit Drag-and-Drop-Funktionalität.",
        role: "Frontend-Entwickler",
      },
      technologies: ["Vue.js", "Rails"],
      type: "web",
    },
    {
      en: {
        title: "Carbon Footprint Tracker",
        description:
          "Built a mobile application that helps users track and reduce their carbon footprint. Implemented real-time data visualization and personalized recommendations.",
        role: "Mobile Developer",
      },
      de: {
        title: "CO2-Fußabdruck-Tracker",
        description:
          "Entwicklung einer mobilen Anwendung, die Benutzern hilft, ihren CO2-Fußabdruck zu verfolgen und zu reduzieren. Implementierung von Echtzeit-Datenvisualisierung und personalisierten Empfehlungen.",
        role: "Mobile-Entwickler",
      },
      technologies: ["React Native", "Elixir", "Phoenix"],
      type: "mobile",
    },
    {
      en: {
        title: "Sustainability Platform",
        description:
          "Created a full-stack platform connecting consumers with sustainable products and services. Implemented advanced filtering, user reviews, and vendor management.",
        role: "Fullstack Developer",
      },
      de: {
        title: "Nachhaltigkeitsplattform",
        description:
          "Erstellung einer Full-Stack-Plattform, die Verbraucher mit nachhaltigen Produkten und Dienstleistungen verbindet. Implementierung erweiterter Filterfunktionen und Benutzerbewertungen.",
        role: "Fullstack-Entwickler",
      },
      technologies: ["React", "Node.js", "TypeScript"],
      type: "web",
    },
  ];

  return projects.map((project) => ({
    title: project[language].title,
    description: project[language].description,
    technologies: project.technologies,
    role: project[language].role,
    type: project.type,
  }));
}
