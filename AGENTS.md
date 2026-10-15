# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Build a website called "Planet Hop" that takes visitors on a trip through the solar system. Start with a dark starry hero that says "Blast off!" with a big button. Then one card for each of the 8 planets with a picture, its size compared to Earth, and one wow fact. Add a "How long would the trip take?" section and a "Pick your favourite planet" vote at the end. Dark navy background, glowing purple and teal accents, smooth animations as you scroll.

## Goal
Build "Planet Hop" — a single-page interactive solar system journey with a starry hero, 8 planet cards, trip duration section, and a favourite planet vote on a dark navy background with glowing purple and teal accents.

## Project type
landing-page

## Design system — match this exactly
- Color tokens: `--background: #0a0e2a`, `--foreground: #e8eaf6`, `--card: #111638`, `--border: #2a2f6a`, `--muted-foreground: #94a3c8`, `--primary: #7c3aed`, `--accent: #0d9488`, `--primary-glow: rgba(124, 58, 237, 0.35)`, `--accent-glow: rgba(13, 148, 136, 0.18)`

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`cta`, `footer`, `hero`, `nav`, `planets`, `trip`, `tripDuration`, `vote`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
