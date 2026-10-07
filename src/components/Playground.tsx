import AnomalyPlot from "./AnomalyPlot";

export default function Playground({ themeKey }: { themeKey: string }) {
  return (
    <section id="playground">
      <div className="wrap play">
        <div>
          <h2>Try the idea behind my review-spam project.</h2>
          <p className="muted" style={{ marginTop: 16, maxWidth: "52ch" }}>
            Anomaly detection means measuring how far something sits from "normal" and drawing a line.
            Here, normal is two clusters of points. Anything beyond the dashed ring gets flagged.
          </p>
          <ol className="how">
            <li>Slide the sensitivity to move the ring in or out.</li>
            <li>Hover to score any spot on the plot.</li>
            <li>Click or tap to drop your own point and see if it's flagged.</li>
          </ol>
        </div>
        <AnomalyPlot themeKey={themeKey} />
      </div>
    </section>
  );
}
