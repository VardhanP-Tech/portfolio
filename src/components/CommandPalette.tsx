import { useEffect, useMemo, useRef, useState } from "react";

export interface Command { id: string; label: string; hint: string; run: () => void }

export default function CommandPalette({ open, onClose, commands }: { open: boolean; onClose: () => void; commands: Command[] }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? commands.filter((c) => (c.label + " " + c.hint).toLowerCase().includes(s)) : commands;
  }, [q, commands]);

  useEffect(() => {
    if (open) {
      prevFocus.current = document.activeElement as HTMLElement;
      setQ(""); setIdx(0);
      setTimeout(() => input.current?.focus(), 0);
    } else {
      prevFocus.current?.focus?.();
    }
  }, [open]);

  useEffect(() => { setIdx(0); }, [q]);

  if (!open) return null;

  const run = (c?: Command) => { if (!c) return; onClose(); c.run(); };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.preventDefault(); onClose(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setIdx((i) => Math.min(list.length - 1, i + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); run(list[idx]); }
    else if (e.key === "Tab") { e.preventDefault(); input.current?.focus(); }
  };

  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command menu" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <input
          ref={input} value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Jump to a section or run an action"
          role="combobox" aria-expanded="true" aria-controls="palette-list"
          aria-activedescendant={list[idx] ? `cmd-${list[idx].id}` : undefined}
        />
        <ul id="palette-list" role="listbox">
          {list.map((c, i) => (
            <li key={c.id} id={`cmd-${c.id}`} role="option" aria-selected={i === idx}
              onMouseEnter={() => setIdx(i)} onClick={() => run(c)}>
              <span>{c.label}</span><small>{c.hint}</small>
            </li>
          ))}
          {list.length === 0 && <li className="none" role="presentation">Nothing matches "{q}".</li>}
        </ul>
        <div className="palette-foot"><span>↑↓ to move</span><span>Enter to run</span><span>Esc to close</span></div>
      </div>
    </div>
  );
}
