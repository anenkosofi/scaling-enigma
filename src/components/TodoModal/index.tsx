import React, { FC } from 'react';

import { ModalContainer } from '../ModalContainer';
import { EditForm } from '../EditForm';

type TodoModalProps = {
  closeModal: () => void;
  todo: {
    id?: string;
    text: string;
    time?: {
      start?: string;
      end?: string;
    };
  };
  clearInput?: () => void;
};

export const TodoModal: FC<TodoModalProps> = ({
  closeModal,
  clearInput,
  todo,
}: TodoModalProps) => {
  return (
    <ModalContainer closeModal={closeModal}>
      <EditForm closeModal={closeModal} clearInput={clearInput} todo={todo} />
    </ModalContainer>
  );
};
