import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import './ModalContainer.scss';

export function ModalContainer({ closeModal, children }) {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [closeModal]);

  return createPortal(
    <div className="overlay">
      <div className="modal">{children}</div>
    </div>,
    document.querySelector('#modal-root')
  );
}

ModalContainer.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
