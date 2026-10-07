import { useEffect, useState } from "react";
import { PROFILE } from "../data";
import GlowCard from "./GlowCard";

interface Repo {
  id: number; name: string; html_url: string; description: string | null;
  language: string | null; stargazers_count: number; pushed_at: string; fork: boolean;
}

const KEY = "vv-gh-cache-v1";

export default function GitHubRepos() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) { setRepos(JSON.parse(raw)); setState("ok"); return; }
    } catch { /* ignore */ }

    fetch(`https://api.github.com/users/${PROFILE.githubUser}/repos?sort=pushed&per_page=30`)
      .then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then((all: Repo[]) => {
        if (cancelled) return;
        const list = all.filter((r) => !r.fork).slice(0, 6);
        setRepos(list); setState("ok");
        try { sessionStorage.setItem(KEY, JSON.stringify(list)); } catch { /* ignore */ }
      })
      .catch(() => { if (!cancelled) setState("error"); });
    return () => { cancelled = true; };
  }, []);

  const ago = (iso: string) => {
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
    if (days < 1) return "today";
    if (days < 31) return `${days}d ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return `${Math.floor(days / 365)}y ago`;
  };

  return (
    <div className="gh">
      <div className="gh-head">
        <h3>Latest on GitHub</h3>
        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">All repositories</a>
      </div>
      {state === "loading" && <p className="muted" role="status">Loading repositories…</p>}
      {state === "error" && (
        <p className="muted" role="status">
          Couldn't load repositories right now (GitHub may be rate-limiting). <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">Open my GitHub profile</a> instead.
        </p>
      )}
      {state === "ok" && repos && (
        repos.length === 0
          ? <p className="muted">No public repositories to show yet.</p>
          : <ul className="gh-grid">
              {repos.map((r) => (
                <li key={r.id}>
                  <GlowCard className="glass gh-card">
                  <a href={r.html_url} target="_blank" rel="noopener noreferrer">
                    <b>{r.name}</b>
                    <span>{r.description ?? "No description yet."}</span>
                    <small>{[r.language, r.stargazers_count ? `${r.stargazers_count} stars` : null, `updated ${ago(r.pushed_at)}`].filter(Boolean).join(" · ")}</small>
                  </a>
                  </GlowCard>
                </li>
              ))}
            </ul>
      )}
    </div>
  );
}
