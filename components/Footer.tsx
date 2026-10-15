"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { APP_NAME } from "@/lib/data";

export default function Footer() {
  const t = useTranslations();
  const footerHeading = t("footer.heading");
  const footerBody = t("footer.body");
  const footerItems = (
    Array.isArray(t.raw("footer.items")) ? t.raw("footer.items") : []
  ) as string[];

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--background)] overflow-hidden">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-5xl mb-4">🚀</div>
          <h2
            className="text-2xl font-black text-[var(--foreground)] mb-4 tracking-wide"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            {footerHeading}
          </h2>
          <p
            className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          >
            {footerBody}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {footerItems.map((item, i) => (
              <span
                key={i}
                className="text-sm text-[var(--muted-foreground)] px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)]"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                {item}
              </span>
            ))}
          </div>

          <div
            className="h-px w-24 mx-auto mb-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--primary), var(--accent), transparent)",
            }}
          />

          <p
            className="text-xs text-[var(--muted-foreground)] tracking-widest uppercase"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            {APP_NAME} 🪐
          </p>
        </motion.div>
      </div>
    </footer>
  );
}