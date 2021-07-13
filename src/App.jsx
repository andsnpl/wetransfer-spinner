import * as React from "react";
import "./App.css";
import Spinner from "./Spinner";

function useFakeUploadState() {
  const [state, setState] = React.useState("READY");
  const [rawValue, setRawValue_] = React.useState("0.0");
  const [value, setValue] = React.useState(0);
  return {
    state,
    value,
    rawValue,
    setRawValue(v) {
      setRawValue_(v);
      const parsed = parseFloat(v);
      if (isNaN(parsed)) {
      } else {
        setValue(parsed);
      }
    },
    start() {
      setState("ACTIVE");
    },
    pause() {
      setState("PAUSED");
    },
    reset() {
      setState("READY");
      setRawValue_("0.0");
      setValue(0);
    }
  };
}

export default function App() {
  const {
    state,
    value,
    rawValue,
    setRawValue,
    start,
    pause,
    reset
  } = useFakeUploadState();
  return (
    <div className="App">
      <h1>Hello WeTransfer</h1>
      <div className="card">
        <Spinner state={state} value={value} />
        <div className="controls">
          <div className="control-buttons">
            <button type="button" onClick={start}>
              Start
            </button>
            <button type="button" onClick={pause}>
              Pause
            </button>
            <button type="button" onClick={reset}>
              Reset
            </button>
          </div>
          <div className="control-fields">
            <input
              id="control-fields-percent"
              type="number"
              min={0}
              max={100}
              step={5}
              value={rawValue}
              onChange={(e) => setRawValue(e.target.value)}
              onBlur={() => setRawValue(value.toFixed(1))}
            />
            %
          </div>
        </div>
      </div>
    </div>
  );
}
