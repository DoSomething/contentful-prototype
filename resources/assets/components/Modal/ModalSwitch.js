import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, PostSignupModal, ContentModal, ReportbackUploaderModal, SurveyModal,
  POST_SIGNUP_MODAL, CONTENT_MODAL, REPORTBACK_UPLOADER_MODAL, SURVEY_MODAL,
} from '../Modal';

const ModalSwitch = (props) => {
  const { modalType } = props;
  let children = null;

  switch (modalType) {
    case POST_SIGNUP_MODAL:
      children = <PostSignupModal />;
      break;
    case CONTENT_MODAL:
      children = <ContentModal />;
      break;
    case REPORTBACK_UPLOADER_MODAL:
      children = <ReportbackUploaderModal />;
      break;
    case SURVEY_MODAL:
      children = <SurveyModal />;
      break;
    default: break;
  }

  return (
    <Modal>{ children }</Modal>
  );
};

ModalSwitch.propTypes = {
  modalType: PropTypes.string,
};

ModalSwitch.defaultProps = {
  modalType: null,
};

export default ModalSwitch;
