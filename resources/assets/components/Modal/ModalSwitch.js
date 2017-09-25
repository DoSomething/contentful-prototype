import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal, PostSignupModal, PageModal,
  POST_SIGNUP_MODAL, PAGE_MODAL,
} from '../Modal';

const ModalSwitch = (props) => {
  const { modalType } = props;
  let children = null;

  switch (modalType) {
    case POST_SIGNUP_MODAL: children = <PostSignupModal />; break;
    case PAGE_MODAL: children = <PageModal />; break;
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
