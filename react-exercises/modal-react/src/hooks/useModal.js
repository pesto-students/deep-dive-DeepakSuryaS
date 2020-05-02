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

  /* useEffect(() => {
    isShowing && args.ref.current.focus()
    function keyListener(event) {
      const listener = keyListenersMap.get(event.keyCode)
      return listener && listener(event)
    }
    document.addEventListener("keydown", keyListener)

    return () => document.removeEventListener("keydown", keyListener)
  }, [isShowing])

  function handleTabKey(event) {
    const modalElement = document.getElementById("modal")
    const focusableModalElements = modalElement.querySelectorAll(
      'a[href], button, textarea, input, select'
    )
    if(focusableModalElements) {
      if (!event.shiftKey) {
        if(activeElementIndex >= focusableModalElements.length) {
          setActiveElementIndex(0)
        } else if(activeElementIndex < 0) {
          setActiveElementIndex(0)
        } else {
          setActiveElementIndex(prev => prev + 1)
        }
        focusableModalElements[activeElementIndex].focus()
        return event.preventDefault()
      }

      if (event.shiftKey) {
        if(activeElementIndex >= focusableModalElements.length) {
          setActiveElementIndex(0)
        } else if(activeElementIndex < 0) {
          setActiveElementIndex(0)
        } else {
          setActiveElementIndex(prev => prev - 1)
        }
        focusableModalElements[activeElementIndex].focus()
        event.preventDefault()
      }
    }
  }

  const keyListenersMap = new Map([[27, toggle], [9, handleTabKey]]) */

  return [{ isShowing, hide: toggle, args }, toggle]
}

export default useModal