import { SKILLS } from "../data";
import GlowCard from "./GlowCard";

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="section-head">
          <h2>Tools I work with</h2>
          <p>Grouped by what I use them for.</p>
        </div>
        <div className="skills">
          {SKILLS.map((g) => (
            <GlowCard key={g.group} className="glass skill-card">
              <h3>{g.group}</h3>
              <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
