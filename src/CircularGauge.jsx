import "./CircularGauge.css";

function GaugeCircle({ color, origin, children }) {
  const rotationCss = origin && `rotate(${origin})`;
  return (
    <div
      className="gauge-circle"
      style={{
        backgroundColor: color,
        transform: rotationCss
      }}
      aria-hidden
    >
      {children}
    </div>
  );
}

function GaugeBackgroundPanel({ color, rotation }) {
  const rotationCss = `rotate(${rotation}deg)`;
  return (
    <div
      className="gauge-background-panel"
      style={{
        backgroundColor: color,
        transform: rotationCss
      }}
    />
  );
}

function GaugeEndcap({ color, rotation, isVisible }) {
  const rotationCss = `rotate(${rotation}deg)`;
  const scaleCss = isVisible ? "scaleX(1)" : "scaleX(0)";
  return (
    <div className="gauge-endcap-container" style={{ transform: rotationCss }}>
      <div
        className="gauge-endcap"
        style={{ transform: scaleCss, backgroundColor: color }}
      />
    </div>
  );
}

function GaugeReadout({ value }) {
  if (typeof value === "number") {
    value = value.toFixed(0);
  }
  return (
    <div className="gauge-readout">
      <span className="gauge-value">{value}</span>
      {value && <span className="gauge-percent-sign">%</span>}
    </div>
  );
}

function CircularGauge({
  value,
  origin = null,
  backgroundColor: bg = "#e2e4e6",
  fillColor: fg = "#409fff",
  pageColor = "#ffffff",
  children = null
}) {
  value = Math.max(Math.min(value, 100), 0);
  const arc = (value * 360) / 100;
  return (
    <div className="gauge">
      <GaugeCircle color={fg} origin={origin}>
        {/**
         * Four background panels covering 90deg each that rotate out of the
         * way to reveal the circle color + one stationary panel filled with
         * the fill color, to allow the background panels to be completely
         * hidden at 100%.
         */}
        <GaugeBackgroundPanel color={bg} rotation={Math.max(arc, 0)} />
        <GaugeBackgroundPanel color={bg} rotation={Math.max(arc, 90)} />
        <GaugeBackgroundPanel color={bg} rotation={Math.max(arc, 180)} />
        <GaugeBackgroundPanel color={bg} rotation={Math.max(arc, 270)} />
        {arc > 90 && (
          <GaugeBackgroundPanel color={fg} rotation={0} minRotation={0} />
        )}
        <GaugeEndcap color={fg} rotation={0} isVisible={arc > 0} />
        <GaugeEndcap color={fg} rotation={arc} isVisible={arc > 0} />
      </GaugeCircle>
      <div className="gauge-center" style={{ backgroundColor: pageColor }}>
        {children ? children : <GaugeReadout value={value} />}
      </div>
    </div>
  );
}

// Export the readout component as a convenience, to help callers override
// the display.
CircularGauge.Readout = GaugeReadout;

export default CircularGauge;
