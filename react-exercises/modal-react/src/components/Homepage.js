import React, { createRef, useEffect } from 'react'
import Modal from './Modal'
import useModal from '../hooks/useModal'
import { navigate } from '@reach/router'

function Homepage({ isLoggedIn, setIsLoggedIn }) {

  function handleSubmit() {
    setIsLoggedIn(true)
    navigate('/dashboard')
  }

  const [signUpModal, toggleSignUpModal] = useModal({
    heading: 'Sign up'
  })

  const [signInModal, toggleSignInModal] = useModal({
    heading: 'Sign in'
  })

  return (
    <div>
      <button className="buttonDefault" onClick={toggleSignUpModal}>
        Sign up
      </button>
      <button className="buttonDefault" onClick={toggleSignInModal}>
        Sign in
      </button>
      <Modal {...signUpModal}>
        <div>
          <label>Username</label>
          <input type="text" name="username" id="username" />
          <label>Password</label>
          <input type="password" name="password" id="password" />
          <button className="actionButton" onClick={handleSubmit}>Submit</button>
        </div>
      </Modal>
      <Modal {...signInModal}>
        <div>
          <label>Username</label>
          <input type="text" name="username" id="username" />
          <label>Password</label>
          <input type="password" name="password" id="password" />
          <button className="actionButton" onClick={handleSubmit}>Submit</button>
        </div>
      </Modal>
    </div>
  )
}

export default Homepage