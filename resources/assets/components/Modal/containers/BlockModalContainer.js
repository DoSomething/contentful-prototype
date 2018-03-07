import { connect } from 'react-redux';
import BlockModal from '../configurations/BlockModal';
import { closeModal } from '../../../actions/modal';
import { findContentfulEntry } from '../../../helpers';

const mapStateToProps = (state) => {
  const id = state.modal.contentfulId;

  const json = findContentfulEntry(state, id);

  return { json };
};

const actionCreators = {
  closeModal,
};

export default connect(mapStateToProps, actionCreators)(BlockModal);
