import * as React from "react";
import "./Spinner.css";
import CircularGauge from "./CircularGauge";

function Spinner({ state, value }) {
  value = Math.max(Math.min(value, 100), 0);
  const gaugeValue = Math.max(value, 1);
  const [outerClasses, innerClasses] = {
    READY: ["", ""],
    ACTIVE: ["spinner", "spinner-reverse"],
    PAUSED: ["spinner spinner-paused", "spinner-reverse spinner-paused"]
  }[state];
  return (
    <>
      <div className={outerClasses}>
        <CircularGauge value={gaugeValue} origin="90deg">
          {/**
           * Replacing the default readout for two reasons:
           * 1. We should display 0% if value is 0, even though we force a
           *    minimum 1% arc on the gauge.
           * 2. Gauge shouldn't know anything about the spinner's rotation, so
           *    we rotate the outer div and then reverse it for the readout.
           */}
          <div className={innerClasses}>
            <CircularGauge.Readout value={value} />
          </div>
        </CircularGauge>
      </div>
    </>
  );
}

export default Spinner;
