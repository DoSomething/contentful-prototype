import { connect } from 'react-redux';
import { closeModal } from '../../../actions/modal';
import Modal from '../Modal';

const mapStateToProps = state => ({
  shouldShowModal: state.modal.shouldShowModal,
});

const actionCreators = {
  closeModal,
};

export default connect(mapStateToProps, actionCreators)(Modal);
