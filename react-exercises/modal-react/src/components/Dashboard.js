import React, { useEffect } from 'react'
import { navigate } from '@reach/router'

function Dashboard({ isLoggedIn, setIsLoggedIn }) {
  function handleSignOut() {
    setIsLoggedIn(false)
    navigate('/')
  }

  useEffect(() => {
    !isLoggedIn && navigate('/')
  }, [isLoggedIn])

  return (
    <div>
      Dashboard
      <button className="actionButton" onClick={handleSignOut}>Sign out</button>
    </div>
  )
}

export default Dashboard