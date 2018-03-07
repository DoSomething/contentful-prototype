import React from 'react';
import PropTypes from 'prop-types';
import ContentfulEntry from '../../ContentfulEntry';
import ModalControls from '../ModalControls';

const ContentModal = (props) => {
  const { json, closeModal } = props;

  return (
    <ModalControls className="modal__slide" onClose={closeModal}>
      <ContentfulEntry json={json} />
    </ModalControls>
  );
};

ContentModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  json: PropTypes.object, // eslint-disable-line
};

ContentModal.defaultProps = {
  json: null,
};

export default ContentModal;
