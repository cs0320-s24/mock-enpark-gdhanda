import { useState } from 'react';
import '../styles/App.css';
import { LoginButton } from './LoginButton';
import REPL from './REPL';

/**
 * This is the highest level component!
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  let headerHeight = '100vh';
  if (isLoggedIn) {
    headerHeight = '215px';
  }
  return (
    <div className="App">
      <p className="App-header" style={{height: headerHeight}}>
        <h1 style={{ position: "absolute", top: "0px" }}>Welcome!</h1>
        {isLoggedIn && (
          <h3 style={{ position: "absolute", top: "80px" }}>
            (Enter your command below)
          </h3>
        )}
        {!isLoggedIn && (
          <h3 style={{ position: "absolute", top: "80px" }}>
            (Please login to continue)
          </h3>
        )}
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </p>

      {isLoggedIn && <REPL />}
    </div>
  );
}

export default App;