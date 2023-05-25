import React from "react";

function Modal({ show, setShow, children }) {


    const closeModal = () => {
        setShow(false)
    }


  return (
    <div className={`${show ? "modal active" : "modal"}`}>
      <span className="close-modal" onClick={closeModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        
      </span>
      <div className="modal-content">{children}</div>
    </div>
  );
}

export default Modal;
