// Modal.js

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function CustomModal(props) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    if(props.onOpen) props.onOpen()
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    if(props.onClose) props.onClose() 

    setIsOpen(false);
  }

  return (
    
    <div>
      
      <button style={props.btnStyle || {}} onClick={openModal}>{props.openButton}</button>
      
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel={props.contentLabel}
      >
        <div className="flex-col">

           <button onClick={closeModal}>{props.closeButton}</button>

           {props.children}

        </div>
    
      </Modal>
    
    </div>
  
  )

}

export default CustomModal