import React from 'react';
import PropTypes from 'prop-types';
import { ReportbackUploaderContainer } from '../../ReportbackUploader';

const ReportbackUploaderModal = ({ closeModal }) => (
  <div className="modal__slide">
    <ReportbackUploaderContainer modalClose={closeModal} />
  </div>
);

ReportbackUploaderModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ReportbackUploaderModal;
