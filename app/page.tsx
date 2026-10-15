"use client";

import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Rocket, Clock, Star, Trophy, ChevronDown } from 'lucide-react';
import { useState, useEffect } from "react";

// ─── Planet data ────────────────────────────────────────────────────────────
const PLANETS = [
  {
    id: "mercury",
    name: "Mercury",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/7da0aaee38d0412cb4bb06e8041d18ab.png",
    color: "#b5a99a",
    glow: "rgba(181,169,154,0.35)",
    sizeVsEarth: "0.38×",
    sizeLabel: "38% of Earth",
    fact: "A year on Mercury lasts just 88 Earth days, but a single day lasts 59 Earth days!",
    order: 1,
  },
  {
    id: "venus",
    name: "Venus",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c46ef0103ff840b18a5214d0ccb98bd0.png",
    color: "#e8c97a",
    glow: "rgba(232,201,122,0.35)",
    sizeVsEarth: "0.95×",
    sizeLabel: "95% of Earth",
    fact: "Venus spins backwards compared to most planets, so the Sun rises in the west!",
    order: 2,
  },
  {
    id: "earth",
    name: "Earth",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/118f32a1e36b408ab1a5fa733446f5b1.png",
    color: "#4fc3f7",
    glow: "rgba(79,195,247,0.35)",
    sizeVsEarth: "1×",
    sizeLabel: "That's us!",
    fact: "Earth is the only planet known to have liquid water on its surface and life!",
    order: 3,
  },
  {
    id: "mars",
    name: "Mars",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/bfce298cc9a44a1f816675b755a95ab9.png",
    color: "#ef7c5a",
    glow: "rgba(239,124,90,0.35)",
    sizeVsEarth: "0.53×",
    sizeLabel: "53% of Earth",
    fact: "Mars has the tallest volcano in the solar system, Olympus Mons, three times taller than Everest!",
    order: 4,
  },
  {
    id: "jupiter",
    name: "Jupiter",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d139909fa2744fd7abee4baf6c34ffc7.png",
    color: "#c8a97e",
    glow: "rgba(200,169,126,0.35)",
    sizeVsEarth: "11.2×",
    sizeLabel: "11× bigger than Earth",
    fact: "Jupiter's Great Red Spot is a storm that has been raging for over 350 years!",
    order: 5,
  },
  {
    id: "saturn",
    name: "Saturn",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/e419fcaf7a2a450caec12bbea4564f6c.png",
    color: "#e8d5a3",
    glow: "rgba(232,213,163,0.35)",
    sizeVsEarth: "9.45×",
    sizeLabel: "9× bigger than Earth",
    fact: "Saturn's rings are made of ice and rock, and they stretch 282,000 km wide but are only 1 km thick!",
    order: 6,
  },
  {
    id: "uranus",
    name: "Uranus",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/afd2e992dac64d1fbb3336be032f5038.png",
    color: "#7de8e8",
    glow: "rgba(125,232,232,0.35)",
    sizeVsEarth: "4×",
    sizeLabel: "4× bigger than Earth",
    fact: "Uranus rotates on its side with a tilt of 98 degrees, so it basically rolls around the Sun!",
    order: 7,
  },
  {
    id: "neptune",
    name: "Neptune",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/bdc5d884faba48ccb9c659f6027a2365.png",
    color: "#4b7be5",
    glow: "rgba(75,123,229,0.35)",
    sizeVsEarth: "3.88×",
    sizeLabel: "Nearly 4× bigger than Earth",
    fact: "Neptune has the fastest winds in the solar system, reaching 2,100 km/h, faster than sound!",
    order: 8,
  },
];

// ─── Trip duration data ──────────────────────────────────────────────────────
const TRIPS = [
  { planet: "Mercury", emoji: "🪐", time: "~5 months", vehicle: "Space shuttle", speed: "28,000 km/h" },
  { planet: "Venus", emoji: "🌟", time: "~3.5 months", vehicle: "Space shuttle", speed: "28,000 km/h" },
  { planet: "Mars", emoji: "🔴", time: "~7 months", vehicle: "Space shuttle", speed: "28,000 km/h" },
  { planet: "Jupiter", emoji: "🟠", time: "~2.5 years", vehicle: "Space shuttle", speed: "28,000 km/h" },
  { planet: "Saturn", emoji: "💛", time: "~7 years", vehicle: "Space shuttle", speed: "28,000 km/h" },
  { planet: "Uranus", emoji: "🩵", time: "~14 years", vehicle: "Space shuttle", speed: "28,000 km/h" },
  { planet: "Neptune", emoji: "💙", time: "~30 years", vehicle: "Space shuttle", speed: "28,000 km/h" },
];

// ─── Star field component ────────────────────────────────────────────────────
function StarField() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    x: ((i * 137.508) % 100),
    y: ((i * 97.3) % 100),
    size: i % 5 === 0 ? 2.5 : i % 3 === 0 ? 1.8 : 1.2,
    delay: (i * 0.13) % 4,
    duration: 2.5 + (i % 3),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Shooting star ───────────────────────────────────────────────────────────
function ShootingStar() {
  return (
    <motion.div
      className="absolute top-[15%] left-[-5%] h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent"
      style={{ rotate: 25 }}
      animate={{ x: ["0%", "120vw"], opacity: [0, 1, 0] }}
      transition={{ duration: 1.8, delay: 2, repeat: Infinity, repeatDelay: 7, ease: "easeIn" }}
      aria-hidden="true"
    />
  );
}

// ─── Planet card ─────────────────────────────────────────────────────────────
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

function PlanetCard({ planet, index }: { planet: typeof PLANETS[0]; index: number }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
      style={{
        boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px -8px ${planet.glow}`,
      }}
    >
      {/* Planet image */}
      <div className="relative h-48 overflow-hidden bg-black/30">
        <img
          src={planet.image}
          alt={planet.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Glow overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: `radial-gradient(circle at 50% 80%, ${planet.glow}, transparent 70%)` }}
        />
        {/* Order badge */}
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-xs font-bold text-white/80">
          {planet.order}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold text-white tracking-tight">{planet.name}</h3>
          <span
            className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border"
            style={{ color: planet.color, borderColor: `${planet.color}40`, background: `${planet.color}15` }}
          >
            {planet.sizeVsEarth}
          </span>
        </div>

        <p className="text-xs text-white/50 font-medium uppercase tracking-widest">{planet.sizeLabel}</p>

        <div className="mt-1 flex gap-2 items-start">
          <Star className="shrink-0 mt-0.5 h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
          <p className="text-sm text-white/75 leading-relaxed">{planet.fact}</p>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Vote section ─────────────────────────────────────────────────────────────
function VoteSection() {
  const t = useTranslations();
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [confetti, setConfetti] = useState(false);

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  function castVote(id: string) {
    if (picked) return;
    setPicked(id);
    setVotes((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2000);
  }

  return (
    <section id="vote" className="relative py-24 md:py-32 px-4">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-semibold mb-6">
              <Trophy className="h-4 w-4" aria-hidden="true" />
              {t("vote.badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight text-balance mb-4">
              {t("vote.title")}
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto text-pretty">
              {t("vote.subtitle")}
            </p>
          </div>
        </Reveal>

        {confetti && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center" aria-hidden="true">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-sm"
                style={{
                  background: i % 2 === 0 ? "var(--accent)" : "var(--accent)",
                  left: `${20 + (i * 3.2) % 60}%`,
                  top: "40%",
                }}
                animate={{ y: [0, -120 - (i % 5) * 30], x: [(i % 2 === 0 ? -1 : 1) * i * 8], opacity: [1, 0], rotate: [0, 360] }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PLANETS.map((planet, i) => {
            const count = votes[planet.id] ?? 0;
            const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
            const isChosen = picked === planet.id;
            const isDisabled = picked !== null && !isChosen;

            return (
              <Reveal key={planet.id} delay={i * 0.06}>
                <motion.button
                  onClick={() => castVote(planet.id)}
                  disabled={picked !== null}
                  whileHover={!picked ? { scale: 1.05 } : {}}
                  whileTap={!picked ? { scale: 0.97 } : {}}
                  className={[
                    "w-full flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                    isChosen
                      ? "border-[var(--accent)] bg-[var(--accent)]/20 shadow-[0_0_24px_var(--accent)]"
                      : isDisabled
                      ? "border-white/5 bg-white/3 opacity-50 cursor-not-allowed"
                      : "border-white/10 bg-white/5 hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/10 cursor-pointer",
                  ].join(" ")}
                  aria-pressed={isChosen}
                  aria-label={`Vote for ${planet.name}`}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold"
                    style={{ background: `${planet.glow}`, color: planet.color }}
                  >
                    {planet.order}
                  </div>
                  <span className="text-sm font-bold text-white">{planet.name}</span>

                  {picked && (
                    <div className="w-full">
                      <div className="flex justify-between text-xs text-white/50 mb-1">
                        <span>{count} {count === 1 ? "vote" : "votes"}</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: planet.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  )}

                  {isChosen && (
                    <span className="text-xs font-bold text-[var(--accent)]">
                      {t("vote.yourChoice")}
                    </span>
                  )}
                </motion.button>
              </Reveal>
            );
          })}
        </div>

        {picked && (
          <Reveal>
            <p className="text-center mt-8 text-white/60 text-sm">
              {t("vote.totalLabel")} <span className="text-white font-bold">{totalVotes}</span> {t("vote.totalSuffix")}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const staggerCards: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  return (
    <main className="relative min-h-screen bg-[var(--background)] text-white overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="home"
          className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden"
        >
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(139,92,246,0.18) 0%, rgba(20,184,166,0.08) 50%, transparent 100%)",
            }}
            aria-hidden="true"
          />
          <StarField />
          <ShootingStar />

          {/* Glowing orb */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-semibold mb-8"
            >
              <Rocket className="h-4 w-4" aria-hidden="true" />
              {t("hero.badge")}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-balance leading-none mb-6"
            >
              <span className="text-white">{t("hero.titleLine1")}</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, var(--accent) 0%, var(--accent) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("hero.titleLine2")}
              </span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed text-pretty mb-10"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="#planets"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                style={{
                  background: "linear-gradient(135deg, var(--accent) 0%, var(--accent) 100%)",
                  boxShadow: "0 0 32px rgba(139,92,246,0.45), 0 4px 16px rgba(0,0,0,0.4)",
                }}
                aria-label={t("hero.ctaPrimary")}
              >
                <Rocket className="h-5 w-5" aria-hidden="true" />
                {t("hero.ctaPrimary")}
              </motion.a>

              <motion.a
                href="#trip-duration"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-white/80 border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                aria-label={t("hero.ctaSecondary")}
              >
                <Clock className="h-5 w-5" aria-hidden="true" />
                {t("hero.ctaSecondary")}
              </motion.a>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs"
            aria-hidden="true"
          >
            <span>{t("hero.scrollHint")}</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </section>
      </Reveal>

      {/* ── Planets ───────────────────────────────────────────────────────── */}
      <section id="planets" className="relative py-24 md:py-32 px-4">
        {/* Section glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--accent), var(--accent), transparent)" }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-semibold mb-6">
                <Star className="h-4 w-4" aria-hidden="true" />
                {t("planets.badge")}
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight text-balance mb-4">
                {t("planets.title")}
              </h2>
              <p className="text-white/60 text-lg max-w-2xl mx-auto text-pretty">
                {t("planets.subtitle")}
              </p>
            </div>
          </Reveal>

          <motion.div
            variants={staggerCards}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {PLANETS.map((planet, i) => (
              <PlanetCard key={planet.id} planet={planet} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Trip Duration ─────────────────────────────────────────────────── */}
      <section id="trip-duration" className="relative py-24 md:py-32 px-4">
        {/* Tinted background */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(20,184,166,0.07) 0%, transparent 100%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--accent), var(--accent), transparent)" }}
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-semibold mb-6">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {t("trip.badge")}
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight text-balance mb-4">
                {t("trip.title")}
              </h2>
              <p className="text-white/60 text-lg max-w-xl mx-auto text-pretty">
                {t("trip.subtitle")}
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-3">
            {TRIPS.map((trip, i) => (
              <Reveal key={trip.planet} delay={i * 0.07}>
                <motion.div
                  whileHover={{ x: 6, backgroundColor: "rgba(255,255,255,0.07)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm transition-colors duration-200"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
                >
                  <span className="text-2xl w-8 text-center shrink-0" role="img" aria-label={trip.planet}>
                    {trip.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-base">{trip.planet}</p>
                    <p className="text-xs text-white/40 mt-0.5">{t("trip.speedLabel")} {trip.speed}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p
                      className="font-extrabold text-lg"
                      style={{
                        background: "linear-gradient(135deg, var(--accent), var(--accent))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {trip.time}
                    </p>
                    <p className="text-xs text-white/40">{t("trip.byShuttle")}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div
              className="mt-10 p-6 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 text-center"
            >
              <p className="text-white/70 text-sm leading-relaxed">
                {t("trip.funNote")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Vote ─────────────────────────────────────────────────────────── */}
      <VoteSection />

      {/* ── Final CTA band ───────────────────────────────────────────────── */}
      <Reveal>
        <section className="relative py-20 px-4 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(20,184,166,0.10) 100%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px"
            style={{ background: "linear-gradient(90deg, transparent, var(--accent), var(--accent), transparent)" }}
            aria-hidden="true"
          />

          <div className="relative max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight text-balance mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-white/60 text-lg mb-8 text-pretty">
              {t("cta.subtitle")}
            </p>
            <motion.a
              href="#planets"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              style={{
                background: "linear-gradient(135deg, var(--accent) 0%, var(--accent) 100%)",
                boxShadow: "0 0 32px rgba(139,92,246,0.4), 0 4px 16px rgba(0,0,0,0.3)",
              }}
              aria-label={t("cta.button")}
            >
              <Rocket className="h-5 w-5" aria-hidden="true" />
              {t("cta.button")}
            </motion.a>
          </div>
        </section>
      </Reveal>
    </main>
  );
}