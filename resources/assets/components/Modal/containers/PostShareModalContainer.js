import { connect } from 'react-redux';
import { find } from 'lodash';
import PostShareModal from '../configurations/PostShareModal';
import { closeModal } from '../../../actions/modal';

const mapStateToProps = (state) => {
  const actions = state.campaign.actionSteps;
  if (! actions) {
    return {};
  }

  // TODO: If we have multiple share actions, keep in mind that
  // the copy for the 1+n action will always be 1 action. Requires a bit more
  // work in order to make this always apply to the correct action.
  const shareAction = find(actions, { type: { sys: { id: 'shareAction' } } });

  return {
    content: shareAction ? shareAction.fields.affirmation : {},
  };
};

const actionCreators = {
  closeModal,
};

export default connect(mapStateToProps, actionCreators)(PostShareModal);
