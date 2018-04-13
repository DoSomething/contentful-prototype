import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  PostSignupModal,
  PostReportbackModalContainer,
  POST_SIGNUP_MODAL,
  POST_REPORTBACK_MODAL,
} from '../Modal';

const ModalSwitch = props => {
  let children = null;

  switch (props.modalType) {
    case POST_SIGNUP_MODAL:
      children = <PostSignupModal />;
      break;
    case POST_REPORTBACK_MODAL:
      children = <PostReportbackModalContainer />;
      break;
    default:
      break;
  }

  return <Modal>{children}</Modal>;
};

ModalSwitch.propTypes = {
  modalType: PropTypes.string,
};

ModalSwitch.defaultProps = {
  modalType: null,
  id: null,
};

export default ModalSwitch;
