import { useState } from "react";
import { MockCSVFiles } from "../mockeddata/MockedJSON";

export interface REPLFunction {
  (args: Array<string>): string | string[][];
}

export function REPLFunctions() {
  const commandMap = new Map();
  const mockedFiles = MockCSVFiles();
  const [fileLoaded, setFileLoaded] = useState<boolean>(false);
  const [hasHeader, setHasHeader] = useState<boolean>(false);
  const [filePath, setFilePath] = useState<string>("");

  /**
   * need to create mock data
   * @param args
   * @returns
   */
  const loadCommand: REPLFunction = (args: string[]) => {
    if (args.length != 2) {
      return "Invalid load arguments! Usage: load <filepath> <has-header>.";
    }

    // Add check for valid has-header input
    if (!(args[1] == "true" || args[1] == "false")) {
      return "Invalid input for <has-header>! Valid inputs: 'true', 'false'.";
    }

    if (mockedFiles.has(args[0])) {
      setFileLoaded(true);
      setFilePath(args[0]);
      setHasHeader(args[1] == "true");
      return 'Successfully loaded file from "' + args[0] + '"!';
    }
    return 'Could not load file from "' + args[0] + '"!';
  };

  const searchCommand: REPLFunction = (args: string[]) => {
    if (args.length != 2) {
      return "Invalid search arguments! Usage: search <column> <value>.";
    } else if (!fileLoaded) {
      return 'No file loaded. Try "load <filepath> <has-header>"!';
    }
    // I added a hasHeader variable to track if the currently loaded file has a header
    // but not sure if at all we need to use it here...

    // update with mocking functionality
    return "temporary search results";
  };

  const viewCommand: REPLFunction = (args: string[]) => {
    if (args.length != 0) {
      return "Invalid view arguments! Usage: view.";
    } else if (!fileLoaded) {
      return 'No file loaded. Try "load <filepath> <has-header>"!';
    }

    return mockedFiles.get(filePath);
  };

  // Add desired commands to the command map.
  commandMap.set("load", loadCommand);
  commandMap.set("search", searchCommand);
  commandMap.set("view", viewCommand);

  return commandMap;
}
