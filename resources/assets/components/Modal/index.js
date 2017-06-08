import { connect } from 'react-redux';
import Modal from './Modal';

export default connect(Modal.mapStateToProps, Modal.actionCreators)(Modal);
