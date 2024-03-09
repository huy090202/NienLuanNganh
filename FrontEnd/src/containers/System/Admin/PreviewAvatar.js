import React from "react";
import Modal from "react-modal";
import "./UserRedux.scss";

const PreviewModal = ({ isOpen, imageUrl, onCloseModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      contentLabel="Preview Modal"
    >
      <div className="Avatar-box">
        <img src={imageUrl} alt="Preview" />
        <button onClick={onCloseModal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </Modal>
  );
};

export default PreviewModal;
