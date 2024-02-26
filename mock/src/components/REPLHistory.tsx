import { useState } from "react";
import "../styles/main.css";

interface REPLHistoryProps {
  history: string[][];
  outputMode: boolean;
}
export function REPLHistory(props: REPLHistoryProps) {

  // return with only output showing
  if (props.outputMode) {
    return (
      <div className="repl-history">
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
        {props.history.map((command) => (
          <p>
            <b>{"Command:"}</b> {command[0]} <br></br>
            <b>{"Output:"}</b> {command[1]}
          </p>
        ))}
      </div>
    );
  }
}
