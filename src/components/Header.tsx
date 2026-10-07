import { useState } from "react";
import { SECTIONS } from "../data";
import type { Theme } from "../hooks/useTheme";

interface Props {
  active: string;
  theme: Theme;
  motion: boolean;
  onToggleTheme: () => void;
  onToggleMotion: () => void;
  onOpenPalette: () => void;
  progress: number;
}

export default function Header({ active, theme, motion, onToggleTheme, onToggleMotion, onOpenPalette, progress }: Props) {
  const [open, setOpen] = useState(false);
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

  return (
    <header className="site-header">
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div className="wrap nav">
        <a className="logo" href="#top" aria-label="P. Vishnu Vardhan, home">VV<span>.</span></a>
        <ul className={`nav-links${open ? " open" : ""}`} id="nav-links">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={active === s.id ? "active" : undefined}
                aria-current={active === s.id ? "true" : undefined} onClick={() => setOpen(false)}>{s.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-tools">
          <button className="kbd-btn search-btn" type="button" onClick={onOpenPalette} aria-label="Open command menu">
            <span>Search</span><kbd>{isMac ? "⌘" : "Ctrl"} K</kbd>
          </button>
          <button className="kbd-btn" type="button" onClick={onToggleMotion} aria-pressed={motion}
            title="Turn the background animation on or off">
            Motion {motion ? "on" : "off"}
          </button>
          <button className="icon-btn" type="button" onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <button className="icon-btn menu-btn" type="button" aria-expanded={open}
            aria-controls="nav-links" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
