import { useCallback, useEffect, useState } from "react";

/** Motion defaults to the device setting, but the visitor can override it and it's remembered. */
export function useMotion() {
  const [on, setOn] = useState<boolean>(() => {
    try {
      const s = localStorage.getItem("vv-motion");
      if (s === "on") return true;
      if (s === "off") return false;
    } catch { /* storage unavailable */ }
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-motion", on ? "on" : "off");
    try { localStorage.setItem("vv-motion", on ? "on" : "off"); } catch { /* ignore */ }
  }, [on]);

  const toggle = useCallback(() => setOn((v) => !v), []);
  return { motion: on, toggleMotion: toggle };
}
