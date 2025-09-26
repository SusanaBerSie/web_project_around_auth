import React from "react";
import "../blocks/InfoTooltip.css";
//import successLogo from "../../images/success.png";
//import failLogo from "../../images/fail.png";

export default function InfoTooltip(props) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className="popup__overlay" onClick={handleOverlayClick}></div>
      <div className="pops">
        <button
          className="popup__X-button"
          aria-label="Close modal"
          type="button"
          /* onClick={onClose} */
        >
          X
        </button>
        <div className="pops__container">
          <img src={props.logo} className="pops__success-logo"></img>
          <p className="pops__success-letter">{props.message}</p>
        </div>
      </div>
    </>
  );
}
