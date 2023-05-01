import PropTypes from 'prop-types';

import { ModalContainer } from '../ModalContainer';
import { EditForm } from '../EditForm';

export const TodoModal = ({ closeModal, clearInput, todo }) => {
  return (
    <ModalContainer closeModal={closeModal}>
      <EditForm closeModal={closeModal} clearInput={clearInput} todo={todo} />
    </ModalContainer>
  );
};

TodoModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  clearInput: PropTypes.func,
  todo: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string.isRequired,
    time: PropTypes.exact({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
