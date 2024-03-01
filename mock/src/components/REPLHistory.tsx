import "../styles/main.css";

interface REPLHistoryProps {
  history: [string, string | string[][]][];
  outputMode: boolean;
}

function formatOutput(command: string | string[][]) {
  return typeof command === "string" ? (
    command
  ) : (
    <table aria-label="output data">
      <tbody>
        {command.map((row) => (
          <tr aria-label="data row">
            {row.map((col) => (
              <td>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history" >
      {props.history.map((command) =>
        props.outputMode ? (
          <p> {formatOutput(command[1])} </p>
        ) : (
          <p>
            <b>{"Command: "}</b> {command[0]} <br></br>
            <b>{"Output: "}</b>
            {formatOutput(command[1])}
          </p>
        )
      )}
    </div>
  );
}
