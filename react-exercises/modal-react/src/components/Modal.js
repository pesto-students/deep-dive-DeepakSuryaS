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
