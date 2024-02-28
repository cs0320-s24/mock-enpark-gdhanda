import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { REPLFunctions } from "./REPLFunctions";
/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

export default function REPL() {
  const [historyList, setHistoryList] = useState<
    [string, string | string[][]][]
  >([]);
  const [outputMode, setOutputMode] = useState<boolean>(true);
  const commandMap = REPLFunctions();

  return (
    <div className="repl">
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      {/* TODO: Update your REPLHistory and REPLInput to take in new shared state as props */}
      <REPLHistory history={historyList} outputMode={outputMode} />
      <REPLInput
        history={historyList}
        setHistory={setHistoryList}
        setOutputMode={setOutputMode}
        commandMap={commandMap}
      />
    </div>
  );
}
