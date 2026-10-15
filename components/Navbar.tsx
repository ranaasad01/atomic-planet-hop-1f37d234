"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from 'lucide-react';
import { useTranslations } from "next-intl";
import { navLinks, APP_NAME } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations();
  const navT = t.raw("nav") as Record<string, string>;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background)]/90 backdrop-blur-xl border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🪐</span>
            <span
              className="font-display font-black text-lg tracking-widest text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors duration-200"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const label = navT[link.key] ?? link.label;
              const isAnchor = link.href.startsWith("#");
              const resolvedHref =
                isAnchor && pathname !== "/"
                  ? "/" + link.href
                  : link.href;

              if (link.isCta) {
                return (
                  <Link
                    key={link.key}
                    href={resolvedHref}
                    onClick={(e) =>
                      isAnchor ? handleAnchorClick(e, link.href) : undefined
                    }
                    className="ml-4 px-5 py-2 rounded-full font-display font-bold text-sm tracking-wider text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(124,58,237,0.6)]"
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      background:
                        "linear-gradient(135deg, var(--primary), var(--accent))",
                    }}
                  >
                    {label}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.key}
                  href={resolvedHref}
                  onClick={(e) =>
                    isAnchor ? handleAnchorClick(e, link.href) : undefined
                  }
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-white/5 transition-all duration-200 tracking-wide"
                  style={{ fontFamily: "'Exo 2', sans-serif" }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-[var(--background)]/95 backdrop-blur-xl border-b border-[var(--border)]"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => {
                const label = navT[link.key] ?? link.label;
                const isAnchor = link.href.startsWith("#");
                const resolvedHref =
                  isAnchor && pathname !== "/" ? "/" + link.href : link.href;

                if (link.isCta) {
                  return (
                    <Link
                      key={link.key}
                      href={resolvedHref}
                      onClick={(e) => {
                        if (isAnchor) handleAnchorClick(e, link.href);
                        setMobileOpen(false);
                      }}
                      className="mt-2 px-5 py-3 rounded-full font-display font-bold text-sm tracking-wider text-white text-center transition-all duration-300"
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        background:
                          "linear-gradient(135deg, var(--primary), var(--accent))",
                      }}
                    >
                      {label}
                    </Link>
                  );
                }

                return (
                  <Link
                    key={link.key}
                    href={resolvedHref}
                    onClick={(e) => {
                      if (isAnchor) handleAnchorClick(e, link.href);
                      setMobileOpen(false);
                    }}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-white/5 transition-all duration-200"
                    style={{ fontFamily: "'Exo 2', sans-serif" }}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}