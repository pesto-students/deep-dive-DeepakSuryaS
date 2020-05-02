import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "../Common.css";
import * as Constants from "../Constants";

const Modal = ({ isShowing, hide, args, children }) => {
  function handleOverlayClicked(event) {
    hide();
  }

  function dialogClicked(event) {
    event.stopPropagation();
  }

  /* useEffect(() => {
    function keyListener(event) {
      const listener = keyListenersMap.get(event.keyCode)
      return listener && listener(event)
    }
    document.addEventListener("keydown", keyListener)

    return () => document.removeEventListener("keydown", keyListener)
  }, [])

  function handleTabKey(event) {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    )
    const firstElement = focusableModalElements[0]
    const lastElement = focusableModalElements[focusableModalElements.length - 1]

    if (!event.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus()
      return event.preventDefault()
    }

    if (event.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus()
      event.preventDefault()
    }
  }

  const keyListenersMap = new Map([[27, hide], [9, handleTabKey]]) */

  return isShowing
    ? ReactDOM.createPortal(
        <Fragment>
          <div className="modalOverlay" />
          <div
            className="modalContent"
            aria-modal
            aria-hidden
            tabIndex={Constants.UNSELECTED_TAB_INDEX}
            role="dialog"
            onClick={handleOverlayClicked}
          >
            <div className="modal" id="modal" onClick={dialogClicked}>
              <div className="modalHeader">
                {args && args.heading && (
                  <div className="modalHeading">{args.heading}</div>
                )}
                <button
                  type="button"
                  className="modalCloseButton"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">X</span>
                </button>
              </div>
              {children}
            </div>
          </div>
        </Fragment>,
        document.body
      )
    : null;
};

export default Modal;
