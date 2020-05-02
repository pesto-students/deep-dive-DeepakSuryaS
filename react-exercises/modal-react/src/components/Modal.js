import React, { useEffect, Fragment, createRef } from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ 
  isShowing, 
  hide,
  args,
  children
}) => {

  function handleOverlayClicked(e) {
    hide()
  }

  function dialogClicked(e) {
    e.stopPropagation()
  }

  /* useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode)
      return listener && listener(e)
    }
    document.addEventListener("keydown", keyListener)

    return () => document.removeEventListener("keydown", keyListener)
  }, [])

  function handleTabKey(e) {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    )
    const firstElement = focusableModalElements[0]
    const lastElement = focusableModalElements[focusableModalElements.length - 1]

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus()
      return e.preventDefault()
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus()
      e.preventDefault()
    }
  }

  const keyListenersMap = new Map([[27, hide], [9, handleTabKey]]) */

  return isShowing ? ReactDOM.createPortal(
    <Fragment>
      <div className="modalOverlay" />
      <div 
        className="modalWrapper" 
        aria-modal 
        aria-hidden
        tabIndex="-1"
        role="dialog"
        onClick={handleOverlayClicked}
      >
        <div className="modal" id="modal" onClick={dialogClicked}>
          <div className="modalHeader">
            { args && args.heading && <div className="modalHeading">{args.heading}</div> }
            <button 
              type="button" 
              className="modalCloseButton" 
              data-dismiss="modal" 
              aria-label="Close"
              onClick={hide}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    </Fragment>, document.body
  ) : null
}

export default Modal