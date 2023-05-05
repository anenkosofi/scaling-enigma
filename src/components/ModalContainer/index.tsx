import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

import './ModalContainer.scss';

type ModalContainerProps = {
  closeModal: () => void;
  children: React.ReactNode;
};

export const ModalContainer: FC<ModalContainerProps> = ({
  closeModal,
  children,
}) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
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
    document.querySelector('#modal-root') as HTMLElement
  );
};
