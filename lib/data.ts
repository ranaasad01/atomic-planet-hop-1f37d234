export const APP_NAME = "Planet Hop";
export const APP_TAGLINE = "Journey Through the Solar System";

export interface NavLink {
  label: string;
  href: string;
  key: string;
  isCta?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Planets", href: "#planets", key: "planets" },
  { label: "Trip Times", href: "#trip-duration", key: "tripTimes" },
  { label: "Vote", href: "#vote", key: "vote" },
  { label: "Blast Off!", href: "#planets", key: "blastOff", isCta: true },
];

export type Planet = {
  name: string;
  image: string;
  sizeRelativeToEarth: string;
  wowFact: string;
  color: string;
};

export type TripEntry = {
  planet: string;
  duration: string;
  note: string;
};