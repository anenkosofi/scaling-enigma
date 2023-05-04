import { FC } from 'react';

import { ModalContainer } from '../ModalContainer';
import { EditForm } from '../EditForm';

type TodoModalProps = {
  closeModal: () => void;
  clearInput?: () => void;
  todo: {
    id?: string;
    text: string;
    time?: {
      start?: string;
      end?: string;
    };
  };
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
