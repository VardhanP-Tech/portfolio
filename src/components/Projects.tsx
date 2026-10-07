import { useMemo, useState } from "react";
import { FILTERS, PROJECTS, type Category } from "../data";
import GitHubRepos from "./GitHubRepos";
import GlowCard from "./GlowCard";

export default function Projects() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const inCat = filter === "all" || p.cats.includes(filter);
      const inText = !q || [p.title, p.kind, p.blurb, ...p.tags].join(" ").toLowerCase().includes(q);
      return inCat && inText;
    });
  }, [filter, query]);

  return (
    <section id="projects">
      <div className="wrap">
        <div className="section-head">
          <h2>Projects</h2>
          <p>One full-stack build, two machine learning projects, and four analytics projects. Filter by kind of work, or search by tool.</p>
        </div>

        <GlowCard className="featured glass">
          <div>
            <h3>Real-Time QA Test Execution Dashboard</h3>
            <p>A full-stack app for managing test cases, recording executions, tracking defects and watching the health of each regression cycle. It joins an API, a TypeScript frontend, a relational database and browser automation.</p>
            <a className="btn" href="https://github.com/VardhanP-Tech/QA_Test_dashboard" target="_blank" rel="noopener noreferrer">View the code on GitHub</a>
          </div>
          <ol className="pipeline" aria-label="How the QA dashboard fits together">
            <li><div><b>React + TypeScript + Vite</b><span>Dashboard UI for cases, runs and defects</span></div></li>
            <li><div><b>FastAPI + SQLAlchemy</b><span>API layer and data models</span></div></li>
            <li><div><b>PostgreSQL</b><span>Stores test cases, executions and defects</span></div></li>
            <li><div><b>Playwright + GitHub Actions</b><span>Browser tests that run on every change</span></div></li>
          </ol>
        </GlowCard>

        <div className="toolbar">
          <div className="filters" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button key={f.id} type="button" className="chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
            ))}
          </div>
          <label className="search">
            <span className="sr">Search projects</span>
            <input type="search" placeholder="Search tools, e.g. Power BI" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
        </div>

        <p className="count" aria-live="polite">{shown.length} of {PROJECTS.length} projects</p>

        <div className="cards">
          {shown.map((p) => {
            return (
              <GlowCard key={p.title} className="card-pop">
                <span className="kind">{p.kind}</span>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                {p.result && <span className="result">{p.result}</span>}
                {p.link && <a className="result" href={p.link} target="_blank" rel="noopener noreferrer">Source on GitHub</a>}
                <ul className="tags">
                  {p.tags.map((t) => (
                    <li key={t}><button type="button" onClick={() => { setFilter("all"); setQuery(t); }} title={`Search for ${t}`}>{t}</button></li>
                  ))}
                </ul>
              </GlowCard>
            );
          })}
        </div>
        {shown.length === 0 && (
          <p className="empty">No projects match. <button className="linklike" type="button" onClick={() => { setFilter("all"); setQuery(""); }}>Clear filters</button></p>
        )}

        <GitHubRepos />
      </div>
    </section>
  );
}
