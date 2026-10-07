import { useRef } from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

/** A card that lifts on hover and carries a soft glow spot that follows the pointer. No tilt. */
export default function GlowCard({ className = "", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div ref={ref} className={`pop ${className}`} onPointerMove={onMove}>
      {children}
    </div>
  );
}
