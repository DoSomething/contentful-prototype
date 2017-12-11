import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, PostSignupModal, ContentModal, ReportbackUploaderModalContainer, SurveyModalContainer,
  POST_SIGNUP_MODAL, CONTENT_MODAL, REPORTBACK_UPLOADER_MODAL, SURVEY_MODAL,
} from '../Modal';

const ModalSwitch = (props) => {
  const { modalType } = props;
  let children = null;
  let hideCornerClose = true;

  switch (modalType) {
    case POST_SIGNUP_MODAL:
      children = <PostSignupModal />;
      break;
    case CONTENT_MODAL:
      children = <ContentModal />;
      break;
    case REPORTBACK_UPLOADER_MODAL:
      children = <ReportbackUploaderModalContainer />;
      break;
    case SURVEY_MODAL:
      children = <SurveyModalContainer />;
      hideCornerClose = false;
      break;
    default: break;
  }

  return (
    <Modal hideCornerClose={hideCornerClose}>{ children }</Modal>
  );
};

ModalSwitch.propTypes = {
  modalType: PropTypes.string,
};

ModalSwitch.defaultProps = {
  modalType: null,
};

export default ModalSwitch;
