import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, PostSignupModal, ContentModal, ReportbackUploaderModal,
  PostShareModalContainer, SurveyModalContainer,
  POST_SIGNUP_MODAL, CONTENT_MODAL, REPORTBACK_UPLOADER_MODAL,
  POST_SHARE_MODAL, SURVEY_MODAL,
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
      children = <SurveyModalContainer />;
      break;
    case POST_SHARE_MODAL:
      children = <PostShareModalContainer />;
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
