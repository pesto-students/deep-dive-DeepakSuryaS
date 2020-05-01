import { useState, useEffect } from 'react'

const useModal = (args) => {
  const [isShowing, setIsShowing] = useState(false)

  function toggle() {
    setIsShowing(!isShowing)
  }

  function handleKeydown(e) {
    if (e.key === 'Escape' || e.keyCode === 27) {
      toggle()
    }
  }

  useEffect(() => {
    isShowing && document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [isShowing])

  return [{ isShowing, hide: toggle, args }, toggle]
}

export default useModal