import React, { FC } from 'react';

import { ModalContainer } from 'components/ModalContainer';
import { EditForm } from 'components/EditForm';

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
