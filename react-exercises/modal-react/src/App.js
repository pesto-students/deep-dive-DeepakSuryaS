import React, { useState } from 'react'
import './App.css'
import { Router } from '@reach/router'
import Homepage from './components/Homepage'
import Dashboard from './components/Dashboard'

function App() {  
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
      <Router>
        <Homepage 
          path="/" 
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Dashboard 
          path="/dashboard" 
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Router>
    </div>
  )
}

export default App
