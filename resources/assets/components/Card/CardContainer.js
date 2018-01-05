import { connect } from 'react-redux';
import { ModalListener } from '../Modal';
import { closeModal } from '../../actions/modal';
import Card from './Card';

const actionCreators = {
  closeModal,
};

export default connect(null, actionCreators)(ModalListener(Card));
