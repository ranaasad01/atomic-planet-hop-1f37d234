import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Planet Hop — Journey Through the Solar System",
  description:
    "Blast off on an adventure through all 8 planets of our solar system! Discover amazing facts, travel times, and vote for your favourite planet.",
  openGraph: {
    title: "Planet Hop — Journey Through the Solar System",
    description:
      "Blast off on an adventure through all 8 planets of our solar system! Discover amazing facts, travel times, and vote for your favourite planet.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="#"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)] font-body antialiased">
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}