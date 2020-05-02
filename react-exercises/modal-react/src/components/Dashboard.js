import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import Route from "../Routes";
import "../Common.css";

function Dashboard({ isLoggedIn, setIsLoggedIn }) {
  function handleSignOut() {
    setIsLoggedIn(false);
    navigate(Route.HOME);
  }

  useEffect(() => {
    !isLoggedIn && navigate(Route.HOME);
  }, [isLoggedIn]);

  return (
    <div>
      Dashboard
      <button className="actionButton" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}

export default Dashboard;
