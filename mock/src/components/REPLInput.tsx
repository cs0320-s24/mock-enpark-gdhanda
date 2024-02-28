import "../styles/repl.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "./REPLFunctions";

interface REPLInputProps {
  history: [string, string | string[][]][];
  setHistory: Dispatch<SetStateAction<[string, string | string[][]][]>>;
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
    const command = commandArray[0].toLowerCase();
    let args = commandArray.slice(1, commandArray.length);
    // prevent case sensitivity issues
    for (var i = 0; i < args.length; i++) {
      args[i] = args[i].toLowerCase();
    }

    // Check if no command was specified
    if (commandArray[0] == "") {
      props.setHistory([
        ...props.history,
        [commandString, "Please specify a command!"],
      ]);
    }
    // Check if the mode was changed
    else if (command == "mode") {
      if (
        commandArray.length != 2 ||
        !(args[0] == "verbose" || args[0] == "brief")
      ) {
        props.setHistory([
          ...props.history,
          [commandString, "Usage: mode <verbose> OR mode <brief>."],
        ]);
      } else {
        const output = "Mode updated: " + args[0] + "!";
        props.setHistory([...props.history, [commandString, output]]);
        props.setOutputMode(args[0] == "brief");
      }
    }
    // Otherwise use the given function.
    else {
      handleCommands(command, args);
    }

    setCommandString("");
  }

  /**
   * Helper function to call the correct commands based on user input
   * @param command The command entered by the user
   * @param args The arguments of the command
   */
  function handleCommands(command: string, args: string[]) {
    const result = props.commandMap.get(command);
    if (result != null) {
      const output = result(args);
      props.setHistory([...props.history, [commandString, output]]);
    } else {
      props.setHistory([...props.history, [commandString, "Invalid Command!"]]);
    }
  }

  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
          braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
          into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend className="input-legend">Enter a Command:</legend>
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
        <b>{"Submit!"}</b>
      </button>
    </div>
  );
}
