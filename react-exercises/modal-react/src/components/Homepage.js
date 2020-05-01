import React from 'react'
import Modal from './Modal'
import useModal from '../hooks/useModal'
import { navigate } from '@reach/router'

function Homepage({ isLoggedIn, setIsLoggedIn }) {
  function handleSubmit() {
    console.log('submit: ', isLoggedIn)
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
          <p>Sign up form</p>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </Modal>
      <Modal {...signInModal}>
        <div>
          <p>Sign in form</p>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </Modal>
    </div>
  )
}

export default Homepage