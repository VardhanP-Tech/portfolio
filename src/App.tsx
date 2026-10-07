import { useCallback, useEffect, useMemo, useState } from "react";
import { PROFILE, SECTIONS } from "./data";
import { useTheme } from "./hooks/useTheme";
import { useMotion } from "./hooks/useMotion";
import { useActiveSection } from "./hooks/useActiveSection";
import { useScrollProgress } from "./hooks/useScrollProgress";
import Background from "./components/Background";
import CursorGlow from "./components/CursorGlow";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Playground from "./components/Playground";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import CommandPalette, { type Command } from "./components/CommandPalette";

const IDS = SECTIONS.map((s) => s.id);

export default function App() {
  const { theme, toggle } = useTheme();
  const { motion, toggleMotion } = useMotion();
  const active = useActiveSection(IDS);
  const progress = useScrollProgress();
  const [palette, setPalette] = useState(false);
  const [toast, setToast] = useState("");

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setToast("Email address copied.");
    } catch {
      setToast("Couldn't copy. Select the address and copy it manually.");
    }
    setTimeout(() => setToast(""), 2500);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPalette((o) => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const commands: Command[] = useMemo(() => {
    const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    return [
      ...SECTIONS.map((s) => ({ id: `go-${s.id}`, label: `Go to ${s.label}`, hint: "Navigate", run: go(s.id) })),
      { id: "theme", label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`, hint: "Appearance", run: toggle },
      { id: "motion", label: `Turn motion ${motion ? "off" : "on"}`, hint: "Appearance", run: toggleMotion },
      { id: "copy", label: "Copy email address", hint: "Contact", run: copyEmail },
      { id: "mail", label: "Write an email", hint: "Contact", run: () => { window.location.href = `mailto:${PROFILE.email}`; } },
      { id: "gh", label: "Open GitHub profile", hint: "External", run: () => window.open(PROFILE.github, "_blank", "noopener") },
      { id: "li", label: "Open LinkedIn profile", hint: "External", run: () => window.open(PROFILE.linkedin, "_blank", "noopener") },
    ];
  }, [theme, motion, toggle, toggleMotion, copyEmail]);

  return (
    <>
      <Background />
      <CursorGlow />
      <div className="app">
        <a className="skip" href="#main">Skip to content</a>
        <Header active={active} theme={theme} motion={motion} onToggleTheme={toggle} onToggleMotion={toggleMotion}
          onOpenPalette={() => setPalette(true)} progress={progress} />
        <main id="main">
          <div id="top" />
          <Hero />
          <About />
          <Projects />
          <Playground themeKey={theme} />
          <Experience />
          <Skills />
          <Contact onCopy={copyEmail} toast={toast} />
        </main>
        <footer>
          <div className="wrap">
            <span>© {new Date().getFullYear()} {PROFILE.name}</span>
            <span>{PROFILE.location} · Built with React, TypeScript and Vite</span>
          </div>
        </footer>
      </div>
      <CommandPalette open={palette} onClose={() => setPalette(false)} commands={commands} />
    </>
  );
}
