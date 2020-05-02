import React, { useState } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import Route from "./Routes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Router>
        <Homepage
          path={Route.HOME}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Dashboard
          path={Route.DASHBOARD}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Router>
    </div>
  );
}

export default App;
