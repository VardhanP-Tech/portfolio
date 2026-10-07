import GlowCard from "./GlowCard";
import { PROFILE } from "../data";

const PHOTO = `${import.meta.env.BASE_URL}profile.jpg`;

export default function Hero() {
  return (
    <div className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1>I build software, data pipelines and models <span className="grad">people can use.</span></h1>
          <p className="lede">
            I'm Vishnu, a Computer Science graduate (Cybersecurity) from Hyderabad. I turn technical
            problems into working things: a dashboard, an API, a classifier, a report that runs itself.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#projects">See my projects</a>
            <a className="btn" href={`mailto:${PROFILE.email}`}>Email me</a>
          </div>
          <ul className="hero-facts">
            <li><b>94%</b>review-spam detection accuracy</li>
            <li><b>10K+</b>records analysed</li>
            <li><b>7</b>projects built</li>
          </ul>
        </div>

        <GlowCard className="portrait">
          <div className="portrait-ring">
            <img src={PHOTO} width={800} height={800} alt="Portrait of P. Vishnu Vardhan" fetchPriority="high" />
            <div className="portrait-cap">
              <b>{PROFILE.name}</b>
              <span>Software · Data · AI</span>
            </div>
          </div>
          <span className="float-chip fc-a"><i aria-hidden="true" /> Open to work</span>
          <span className="float-chip fc-b">{PROFILE.location}</span>
        </GlowCard>
      </div>
    </div>
  );
}
