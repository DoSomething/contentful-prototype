import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';
import { closeModal } from '../../../actions/modal';
import Modal from '../Modal';

const mapStateToProps = state => ({
  shouldShowModal: state.modal.shouldShowModal,
  modalType: state.modal.modalType,
});

const actionCreators = {
  closeModal,
};

const mapPropsToEvents = trackEvent => ({
  closeModal: ({ modalType }) => trackEvent('close modal', { modalType }),
});

export default connect(mapStateToProps, actionCreators)(
  PuckConnector(Modal, mapPropsToEvents),
);
