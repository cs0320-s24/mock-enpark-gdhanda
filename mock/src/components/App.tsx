import { useState } from "react";
import "../styles/App.css";
import { LoginButton } from "./LoginButton";
import REPL from "./REPL";

/**
 * This is the highest level component!
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  let headerHeight = "98vh";
  if (isLoggedIn) {
    headerHeight = "26vh";
  }
  return (
    <div className="App">
      <p className="App-header" style={{ height: headerHeight }}>
        <h1 style={{ position: "absolute", top: "0px" }}>Welcome!</h1>
        {isLoggedIn && (
          <h3 style={{ position: "absolute", top: "80px" }}>
            (Enter Your Command Below)
          </h3>
        )}
        {!isLoggedIn && (
          <h3 style={{ position: "absolute", top: "80px" }}>
            (Please Login to Continue)
          </h3>
        )}
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        {isLoggedIn && <REPL />}
      </p>
    </div>
  );
}

export default App;
