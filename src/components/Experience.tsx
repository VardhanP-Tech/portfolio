import GlowCard from "./GlowCard";

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap two-col">
        <div>
          <h2 className="mb">Experience</h2>
          <GlowCard className="card-pop role">
            <h3>Data Science Intern</h3>
            <p className="org">Teks Academy | IIT Guwahati, Hyderabad</p>
            <p className="when">June 2025 to December 2025</p>
            <ul>
              <li>Built and tuned regression and classification models in Python and Scikit-learn.</li>
              <li>Designed Power BI dashboards with KPI tracking and drill-through filters.</li>
              <li>Cleaned data with Pandas, NumPy and advanced Excel, and ran exploratory and trend analysis.</li>
              <li>Automated recurring reports with Python and Excel macros.</li>
            </ul>
          </GlowCard>
          <h3 className="sub">Certifications</h3>
          <div className="stack">
            <GlowCard className="card-pop mini">
              <b>Data Science Program</b><small>IIT Guwahati via Teks Academy, June to December 2025</small>
            </GlowCard>
            <GlowCard className="card-pop mini">
              <b>Data Visualization: Empowering Business with Effective Insights</b><small>Tata Group on Forage, October 2024</small>
            </GlowCard>
          </div>
        </div>
        <div>
          <h2 className="mb">Education</h2>
          <div className="stack">
            <GlowCard className="glass edu-card"><b>B.Tech, Computer Science and Engineering (Cybersecurity)</b><span>Dhanalakshmi Srinivasan College of Engineering, 2021 to 2025</span><span className="score">CGPA 7.03</span></GlowCard>
            <GlowCard className="glass edu-card"><b>Intermediate, MPC</b><span>Gowtham Junior College, 2019 to 2021</span><span className="score">85%</span></GlowCard>
            <GlowCard className="glass edu-card"><b>SSC</b><span>Sri Sai Srujan High School, 2018 to 2019</span><span className="score">9.7 CGPA</span></GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
}
