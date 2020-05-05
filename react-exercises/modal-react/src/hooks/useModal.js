import { useState, useEffect } from 'react'

const useModal = (args) => {
  const [isShowing, setIsShowing] = useState(false)
  const [activeElementIndex, setActiveElementIndex] = useState(0)

  function toggle() {
    setIsShowing(!isShowing)
    !isShowing ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
  }

  function handleKeydown(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      toggle()
    }
  }

  useEffect(() => {
    if(isShowing) {
      document.addEventListener('keydown', handleKeydown)
      args.ref.current.focus()
    }
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [isShowing])

  

  return [{ isShowing, hide: toggle, args }, toggle]
}

export default useModal