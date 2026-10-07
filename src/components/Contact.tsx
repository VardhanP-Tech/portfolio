import { useState } from "react";
import { PROFILE } from "../data";

export default function Contact({ onCopy, toast }: { onCopy: () => void; toast: string }) {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [touched, setTouched] = useState(false);

  const nameErr = touched && !name.trim() ? "Add your name so I know who to reply to." : "";
  const msgErr = touched && msg.trim().length < 10 ? "Write at least a short sentence." : "";

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!name.trim() || msg.trim().length < 10) return;
    const subject = encodeURIComponent(`Portfolio message from ${name.trim()}`);
    const body = encodeURIComponent(`${msg.trim()}\n\n${name.trim()}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact">
      <div className="wrap contact">
        <div>
          <h2>Let's build something together.</h2>
          <p>I'm open to software development, data, AI/ML and analytics roles. Write a note here, or reach me directly.</p>
          <div className="mail-row">
            <a className="mail-link" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            <button className="btn" type="button" onClick={onCopy}>Copy email</button>
          </div>
          <p className="toast" role="status">{toast}</p>
          <div className="social">
            <a className="btn" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        <form className="form glass" onSubmit={send} noValidate>
          <label>Your name
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name"
              aria-invalid={!!nameErr} aria-describedby={nameErr ? "e-name" : undefined} />
            {nameErr && <span className="err" id="e-name">{nameErr}</span>}
          </label>
          <label>Message
            <textarea rows={5} value={msg} onChange={(e) => setMsg(e.target.value)}
              aria-invalid={!!msgErr} aria-describedby={msgErr ? "e-msg" : undefined} />
            {msgErr && <span className="err" id="e-msg">{msgErr}</span>}
          </label>
          <button className="btn primary" type="submit">Open in my email app</button>
          <p className="muted small">This opens your email app with the message filled in. Nothing is stored on this site.</p>
        </form>
      </div>
    </section>
  );
}
