import "../styles/repl.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "./REPL";

interface REPLInputProps {
  history: string[][];
  setHistory: Dispatch<SetStateAction<string[][]>>;
  setOutputMode: Dispatch<SetStateAction<boolean>>;
  commandMap: Map<string, REPLFunction>;
}

// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */

  function handleSubmit(commandString: string) {
    const commandArray = commandString.trim().split(" ");

    // Check if no command was specified
    const command = commandArray[0].toLowerCase();
    if (command == "") {
      props.setHistory([
        ...props.history,
        [commandString, "Please specify a command!"],
      ]);
    }
    // Check if the mode was changed
    else if (command == "mode") {
      if (
        commandArray.length != 2 ||
        !(commandArray[1].toLowerCase() == "verbose" || commandArray[1].toLowerCase() == "brief")
      ) {
        props.setHistory([
          ...props.history,
          [commandString, "Usage: mode <verbose> OR mode <brief>."],
        ]);
      } else {
        const output = "Mode updated: " + commandArray[1] + "!";
        props.setHistory([...props.history, [commandString, output]]);
        props.setOutputMode(commandArray[1] == "brief");
      }
    }
    // Otherwise use the given function.
    else {
      const result = props.commandMap.get(commandArray[0]);
      if (result != null) {
        const output = result(["test"]);
        props.setHistory([...props.history, [commandString, output]]);
      } else {
        props.setHistory([
          ...props.history,
          [commandString, "Invalid Command!"],
        ]);
      }
    }

    setCommandString("");
  }

  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
          braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
          into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend style={{ fontWeight: "bold" }}>Enter a Command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button
        className="submit-button"
        onClick={() => handleSubmit(commandString)}
      >
        {"Submit!"}
      </button>
    </div>
  );
}
