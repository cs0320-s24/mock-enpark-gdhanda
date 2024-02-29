import { useState } from "react";
import { MockCSVFiles, MockCSVSearch } from "../mockeddata/MockedJSON";

export interface REPLFunction {
  (args: Array<string>): string | string[][];
}

export function REPLFunctions() {
  const commandMap = new Map();
  const mockedCSVFiles = MockCSVFiles();
  const mockedSearchResults = MockCSVSearch();
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

    // Check if the file exists
    if (mockedCSVFiles.has(args[0])) {
      // Check whether data or an error message was given
      if (typeof mockedCSVFiles.get(args[0]) === "string") {
        return mockedCSVFiles.get(args[0]);
      } else {
        // Update file data as appropriate
        setFileLoaded(true);
        setFilePath(args[0]);
        setHasHeader(args[1] == "true");
        return 'Successfully loaded file from "' + args[0] + '"!';
      }
    }
    return 'Could not load file from "' + args[0] + '"!';
  };

  const searchCommand: REPLFunction = (args: string[]) => {
    if (args.length < 1 || args.length > 2) {
      return "Invalid search arguments! Usage: search <column (optional)> <value>.";
    } else if (!fileLoaded) {
      return 'No file loaded. Try "load <filepath> <has-header>"!';
    }

    // Check if value present in mocked data
    if (mockedSearchResults.has(args.toString())) {
      return mockedSearchResults.get(args.toString());
    }
    return "Invalid search query: no response found for: " + args.toString();
  };

  const viewCommand: REPLFunction = (args: string[]) => {
    if (args.length != 0) {
      return "Invalid view arguments! Usage: view.";
    } else if (!fileLoaded) {
      return 'No file loaded. Try "load <filepath> <has-header>"!';
    }
    return mockedCSVFiles.get(filePath);
  };

  // Add desired commands to the command map.
  commandMap.set("load", loadCommand);
  commandMap.set("search", searchCommand);
  commandMap.set("view", viewCommand);

  return commandMap;
}
