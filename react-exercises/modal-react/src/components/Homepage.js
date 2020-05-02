import React, { useRef } from "react";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import { navigate } from "@reach/router";
import Route from "../Routes";
import "../Common.css";

function Homepage({ isLoggedIn, setIsLoggedIn }) {
  const inputRef = useRef(null);

  function handleSubmit() {
    setIsLoggedIn(true);
    navigate(Route.DASHBOARD);
  }

  const [signUpModal, toggleSignUpModal] = useModal({
    heading: "Sign up",
    ref: inputRef,
  });

  const [signInModal, toggleSignInModal] = useModal({
    heading: "Sign in",
    ref: inputRef,
  });

  return (
    <div>
      <button className="buttonDefault" onClick={toggleSignUpModal}>
        Sign up
      </button>
      <button className="buttonDefault" onClick={toggleSignInModal}>
        Sign in
      </button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
        earum ad. Enim reiciendis odio at labore consequatur, quas commodi, et
        ipsum sequi cum illum. Repellendus non voluptatum soluta eaque
        reprehenderit.
      </p>
      <Modal {...signUpModal}>
        <div>
          <label>Username</label>
          <input type="text" name="username" id="username" ref={inputRef} />
          <label>Password</label>
          <input type="password" name="password" id="password" />
          <button className="actionButton" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </Modal>
      <Modal {...signInModal}>
        <div>
          <label>Username</label>
          <input type="text" name="username" id="username" ref={inputRef} />
          <label>Password</label>
          <input type="password" name="password" id="password" />
          <button className="actionButton" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Homepage;
