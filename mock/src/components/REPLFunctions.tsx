import { Dispatch, SetStateAction } from "react";

export interface REPLFunction {
  (args: Array<string>): string | string[][];
}

interface REPLFunctionsProps {
  fileLoaded: boolean;
  setFileLoaded: Dispatch<SetStateAction<boolean>>;
}

export function REPLFunctions(props: REPLFunctionsProps) {
  const commandMap = new Map();

  /**
   * need to create mock data
   * @param args
   * @returns
   */
  const loadCommand: REPLFunction = (args: string[]) => {
    if (args.length != 1) {
      return "Invalid load arguments! Usage: load <filepath>.";
    }
    // If successful (add later)
    props.setFileLoaded(true);
    return 'Successfully loaded file from "' + args[0] + '"!';
  };

  const searchCommand: REPLFunction = (args: string[]) => {
    if (args.length != 2) {
      return "Invalid search arguments! Usage: search <column> <value>.";
    } else if (!props.fileLoaded) {
      return 'No file loaded. Try "load <filepath>"!';
    }
    // if successful (add later)
    return "temporary search results";
  };

  const viewCommand: REPLFunction = (args: string[]) => {
    if (args.length != 0) {
      return "Invalid view arguments! Usage: view.";
    } else if (!props.fileLoaded) {
      return 'No file loaded. Try "load <filepath>"!';
    }

    const mockview = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ];

    return mockview;
  };

  // Add desired commands to the command map.
  commandMap.set("load", loadCommand);
  commandMap.set("search", searchCommand);
  commandMap.set("view", viewCommand);

  return commandMap;
}
