import { useState, useCallback } from "react";

/**
 * Honeypot hook for bot protection
 * Hidden field that bots fill but humans don't see
 * If filled, silently reject the submission
 */
export const useHoneypot = () => {
  const [honeypotValue, setHoneypotValue] = useState("");

  const isBot = useCallback(() => {
    return honeypotValue.length > 0;
  }, [honeypotValue]);

  const honeypotProps = {
    value: honeypotValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setHoneypotValue(e.target.value),
    tabIndex: -1,
    autoComplete: "off",
    "aria-hidden": true as const,
  };

  return { honeypotProps, honeypotValue, isBot };
};

/**
 * CSS to hide honeypot field - use as className
 * Uses multiple hiding techniques to fool bots
 */
export const honeypotClassName = "absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none h-0 w-0 overflow-hidden";
