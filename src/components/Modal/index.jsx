import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import './Modal.scss';

export function Modal({ stateFn, children }) {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        stateFn();
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [stateFn]);

  return createPortal(
    <div className="overlay">
      <div className="modal">{children}</div>
    </div>,
    document.querySelector('#modal-root')
  );
}

Modal.propTypes = {
  stateFn: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
