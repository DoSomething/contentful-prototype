import React from 'react';
import PropTypes from 'prop-types';
import ContentfulEntry from '../../ContentfulEntry';
import ModalControls from '../ModalControls';

const BlockModal = (props) => {
  const { json, closeModal } = props;

  return (
    <ModalControls className="modal__slide" onClose={closeModal}>
      <ContentfulEntry json={json} />
    </ModalControls>
  );
};

BlockModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  json: PropTypes.object, // eslint-disable-line
};

BlockModal.defaultProps = {
  json: null,
};

export default BlockModal;
