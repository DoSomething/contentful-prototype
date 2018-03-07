import { connect } from 'react-redux';
import { get } from 'lodash';
import PostShareModal from '../configurations/PostShareModal';
import { closeModal } from '../../../actions/modal';
import { findContentfulEntry } from '../../../helpers';

const mapStateToProps = (state) => {
  const id = state.modal.contentfulId;
  const json = findContentfulEntry(state, id);

  return {
    affirmationText: get(json, 'fields.affirmation'),
    affirmationBlock: get(json, 'fields.affirmationBlock'),
  };
};

const actionCreators = {
  closeModal,
};

export default connect(mapStateToProps, actionCreators)(PostShareModal);
