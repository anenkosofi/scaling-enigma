import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

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
    <div className={css.overlay}>
      <div className={css.modalWindow}>{children}</div>
    </div>,
    document.querySelector('#modal-root')
  );
}
