import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, PostSignupModal, BlockModalContainer, ReportbackUploaderModal,
  PostReportbackModalContainer, PostShareModalContainer, SurveyModalContainer,
  POST_SIGNUP_MODAL, BLOCK_MODAL, REPORTBACK_UPLOADER_MODAL,
  POST_SHARE_MODAL, SURVEY_MODAL, POST_REPORTBACK_MODAL,
} from '../Modal';

const ModalSwitch = (props) => {
  let children = null;

  switch (props.modalType) {
    case POST_SIGNUP_MODAL:
      children = <PostSignupModal />;
      break;
    case BLOCK_MODAL:
      children = <BlockModalContainer />;
      break;
    case REPORTBACK_UPLOADER_MODAL:
      children = <ReportbackUploaderModal />;
      break;
    case SURVEY_MODAL:
      children = <SurveyModalContainer />;
      break;
    case POST_SHARE_MODAL:
      children = <PostShareModalContainer id={props.id} />;
      break;
    case POST_REPORTBACK_MODAL:
      children = <PostReportbackModalContainer />;
      break;
    default: break;
  }

  return (
    <Modal>{ children }</Modal>
  );
};

ModalSwitch.propTypes = {
  modalType: PropTypes.string,
  id: PropTypes.string,
};

ModalSwitch.defaultProps = {
  modalType: null,
  id: null,
};

export default ModalSwitch;
