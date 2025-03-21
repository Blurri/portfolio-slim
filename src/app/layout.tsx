import type React from "react";
import type { Metadata } from "next";
import ClientLayout from "@/app/ClientLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gabor Raz | Software Engineer Portfolio",
  description:
    "Portfolio for a software engineer specializing in web and mobile development",
  alternates: {
    languages: {
      en: "/",
      de: "/?lang=de",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout>{children}</ClientLayout>;
}
