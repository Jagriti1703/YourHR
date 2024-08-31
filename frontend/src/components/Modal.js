import React from 'react';
import './Modal.css';

const Modal = ({ showModal, setShowModal, children }) => {
  if (!showModal) return null;

  return (
    <div className="modal-backdrop" onClick={() => setShowModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={() => setShowModal(false)}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
