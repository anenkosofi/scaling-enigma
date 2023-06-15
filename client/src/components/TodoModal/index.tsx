import React, { FC } from 'react';

import { EditForm } from '@components/EditForm';
import { ModalContainer } from '@components/ModalContainer';

type TodoModalProps = {
  closeModal: () => void;
  todo: {
    text: string;
    _id?: string;
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
