import React from 'react';

const ModalButton = ({ type, text, onClick }) => {
  return (
    <button className={`btn btn-${type}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default ModalButton;