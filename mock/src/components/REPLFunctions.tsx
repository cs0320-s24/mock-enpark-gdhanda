export interface REPLFunction {
  (args: Array<string>): string | string[][];
}

export function REPLFunctions() {
  const commandMap = new Map();

  /**
   * need to create mock data
   * @param args
   * @returns 
   */
  const loadCommand: REPLFunction = (args: string[]) => {
    if (args.length != 1) {
      return "Invalid load argument! Please enter load <filepath>.";
    }
    // if successful (add later)
    return "Successfully loaded file from " + args[0];
  }

  const searchCommand: REPLFunction = (args: string[]) => {
    if (args.length < 1 || args.length > 2) {
        return "Invalid search arguments! Please enter search <value> <column (optional)>.";
    }
    // if successful (add later)
    return "temporary search results";
  };

  const viewCommand: REPLFunction = () => {
    // don't check arguments and show CSV even with extraneous arguments.
    // ^ that makes sense to me but not opposed to adding a check
    return "temporary view results";
  };

  // Add desired commands to the command map.
  commandMap.set("load", loadCommand);
  commandMap.set("search", searchCommand);
  commandMap.set("view", viewCommand);

  return commandMap;
}