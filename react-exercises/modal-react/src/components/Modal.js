import React, { Fragment } from 'react'
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

  return isShowing ? ReactDOM.createPortal(
    <Fragment>
      <div className="modalOverlay" />
      <div 
        className="modalWrapper" 
        aria-modal 
        aria-hidden 
        tabIndex={-1} 
        role="dialog"
        onClick={handleOverlayClicked}
      >
        <div className="modal" onClick={dialogClicked}>
          <div className="modalHeader">
            { args.heading && <div className="modalHeading">{args.heading}</div> }
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