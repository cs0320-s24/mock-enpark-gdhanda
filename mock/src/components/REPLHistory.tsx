import "../styles/main.css";

interface REPLHistoryProps {
  history: [string, string | string[][]][];
  outputMode: boolean;
}

function formatOutput(command: string | string[][]) {
  if (typeof command === "string") {
    return command;
  }
  return (
    <table>
      <tbody>
        {command.map((row) => (
          <tr>
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
  // return with only output showing
  return (
    <div className="repl-history">
      {props.history.map((command) =>
        props.outputMode ? (
          <p> {formatOutput(command[1])} </p>
        ) : (
          <p>
            <b>{"Command:"}</b> {command[0]} <br></br>
            <b>{"Output:"}</b> {formatOutput(command[1])}
          </p>
        )
      )}
    </div>
  );
}
