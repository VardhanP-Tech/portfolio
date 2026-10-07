export const PROFILE = {
  name: "P. Vishnu Vardhan",
  email: "pasupuuletivishnu@gmail.com",
  github: "https://github.com/VardhanP-Tech",
  githubUser: "VardhanP-Tech",
  linkedin: "https://linkedin.com/in/vishnuvardhan-pasupuleti",
  location: "Hyderabad, India",
};

export type Category = "software" | "ml" | "analytics";

export interface Project {
  title: string;
  kind: string;
  blurb: string;
  result?: string;
  link?: string;
  cats: Category[];
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    title: "Real-Time QA Test Execution Dashboard",
    kind: "Full stack",
    blurb: "Manage test cases, record executions, track defects and monitor regression health in one place.",
    link: "https://github.com/VardhanP-Tech/QA_Test_dashboard",
    cats: ["software"],
    tags: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Playwright"],
  },
  {
    title: "Anomaly Detection in Online Reviews",
    kind: "AI and NLP",
    blurb: "Finds fake, spam and bot-written reviews using NLP and statistical modelling.",
    result: "94% detection accuracy",
    cats: ["ml"],
    tags: ["Python", "NLP", "Scikit-learn", "Feature engineering"],
  },
  {
    title: "Malware Classification Pipeline",
    kind: "Cybersecurity",
    blurb: "An ML pipeline built on static and dynamic analysis features, comparing Random Forest, SVM and Logistic Regression.",
    cats: ["ml"],
    tags: ["Python", "Random Forest", "SVM", "Logistic Regression"],
  },
  {
    title: "E-Commerce Sales Analytics Dashboard",
    kind: "Business intelligence",
    blurb: "Revenue, profit, customer behaviour and regional performance across a transaction dataset.",
    result: "10,000+ records analysed",
    cats: ["analytics"],
    tags: ["Power BI", "DAX", "SQL", "Data modelling"],
  },
  {
    title: "HR Workforce Analytics Dashboard",
    kind: "Workforce analytics",
    blurb: "Tracks attrition, diversity, salary and recruitment so HR can see where to act.",
    cats: ["analytics"],
    tags: ["Power BI", "Excel"],
  },
  {
    title: "Healthcare Analytics Dashboard",
    kind: "Healthcare",
    blurb: "Patient and admission KPIs, department performance, occupancy, patient flow and treatment outcomes.",
    cats: ["analytics"],
    tags: ["Power BI", "Data visualisation", "KPIs"],
  },
  {
    title: "Exploratory Data Analysis Pipeline",
    kind: "Python data",
    blurb: "A reusable workflow for cleaning data, plotting distributions, spotting outliers and checking correlations.",
    cats: ["analytics", "ml"],
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
  },
];

export const FILTERS: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "software", label: "Software" },
  { id: "ml", label: "AI and security" },
  { id: "analytics", label: "Analytics" },
];

export const SKILLS: { group: string; items: string[] }[] = [
  { group: "Software", items: ["Python", "FastAPI", "React", "TypeScript", "Vite", "Git and GitHub"] },
  { group: "Data and databases", items: ["SQL", "MySQL", "PostgreSQL", "Pandas", "NumPy", "ETL", "Data modelling"] },
  { group: "AI and machine learning", items: ["Scikit-learn", "NLP", "Anomaly detection", "Classification", "Regression"] },
  { group: "Analytics and BI", items: ["Power BI", "Tableau", "DAX", "Excel", "EDA"] },
  { group: "Testing and automation", items: ["Playwright", "GitHub Actions", "QA workflows"] },
  { group: "Security", items: ["Cybersecurity", "Malware analysis"] },
];

export const SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "playground", label: "Playground" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
