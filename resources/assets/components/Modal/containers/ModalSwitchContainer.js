import { connect } from 'react-redux';
import ModalSwitch from '../ModalSwitch';

const mapStateToProps = state => ({
  modalType: state.modal.modalType,
});

export default connect(mapStateToProps)(ModalSwitch);
