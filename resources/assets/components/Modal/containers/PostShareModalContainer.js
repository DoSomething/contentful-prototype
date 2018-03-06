import { connect } from 'react-redux';
import { get, find } from 'lodash';
import PostShareModal from '../configurations/PostShareModal';
import { closeModal } from '../../../actions/modal';

const mapStateToProps = (state) => {
  const id = state.modal.contentfulId;
  const json = find(state.campaign.pages, { id })
    || find(state.campaign.actionSteps, { id })
    || find(state.campaign.activityFeed, { id });

  return {
    affirmationText: get(json, 'fields.affirmation'),
    affirmationBlock: get(json, 'fields.affirmationBlock'),
  };
};

const actionCreators = {
  closeModal,
};

export default connect(mapStateToProps, actionCreators)(PostShareModal);
