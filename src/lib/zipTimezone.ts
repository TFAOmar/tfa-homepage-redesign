// Simple ZIP → IANA timezone lookup (first digit of ZIP → US region approximation).
// Good enough for quiet-hours check (9pm–8am local).
const RANGES: Array<{ min: number; max: number; tz: string }> = [
  { min: 0, max: 19999, tz: "America/New_York" },
  { min: 20000, max: 26999, tz: "America/New_York" },
  { min: 27000, max: 34999, tz: "America/New_York" },
  { min: 35000, max: 42999, tz: "America/Chicago" },
  { min: 43000, max: 49999, tz: "America/New_York" },
  { min: 50000, max: 58999, tz: "America/Chicago" },
  { min: 59000, max: 69999, tz: "America/Denver" },
  { min: 70000, max: 79999, tz: "America/Chicago" },
  { min: 80000, max: 84999, tz: "America/Denver" },
  { min: 85000, max: 86999, tz: "America/Phoenix" },
  { min: 87000, max: 88499, tz: "America/Denver" },
  { min: 88500, max: 89999, tz: "America/Los_Angeles" },
  { min: 90000, max: 96199, tz: "America/Los_Angeles" },
  { min: 96700, max: 96899, tz: "Pacific/Honolulu" },
  { min: 97000, max: 97999, tz: "America/Los_Angeles" },
  { min: 98000, max: 99499, tz: "America/Los_Angeles" },
  { min: 99500, max: 99999, tz: "America/Anchorage" },
];

export function zipToTimezone(zip: string | null | undefined): string {
  if (!zip) return "America/Los_Angeles";
  const n = parseInt(zip.slice(0, 5), 10);
  if (isNaN(n)) return "America/Los_Angeles";
  const hit = RANGES.find((r) => n >= r.min && n <= r.max);
  return hit?.tz ?? "America/Los_Angeles";
}

/** Returns true if it's currently 9pm–8am in the given timezone. */
export function isQuietHours(tz: string, now = new Date()): boolean {
  try {
    const hour = Number(
      new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", hour12: false }).format(now),
    );
    return hour >= 21 || hour < 8;
  } catch {
    return false;
  }
}