import { useState } from "react";
import "../styles/main.css";

interface REPLHistoryProps {
  history: string[][]
}
export function REPLHistory(props: REPLHistoryProps) {
  const [outputMode, setOutputMode] = useState<string>("brief");

  /**
   * Function to switch the output mode between brief and verbose
   */
  const changeMode = () => {
    if (outputMode == "brief") {
        setOutputMode("verbose");
    }
    else {
        setOutputMode("brief");
    }
  };

  // return with only output showing
  if (outputMode == "brief") {
    return (
        <div className="repl-history">
        <button className="mode-button" onClick={changeMode}> Mode: Brief </button>
        {props.history.map((command) => (
            <p> {command[1]} </p>
        ))}
        </div>
    );
  }
  // return with command and output showing
  else {
      return (
        <div className="repl-history">
          <button className="mode-button" onClick={changeMode}> Mode: Verbose </button>
          {props.history.map((command) => (
            <p> Command: {command[0]} Output: {command[1]} </p>
          ))}
        </div>
      );
  }
}
