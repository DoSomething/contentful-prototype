import { connect } from 'react-redux';
import { get, find } from 'lodash';
import PostShareModal from '../configurations/PostShareModal';
import { closeModal } from '../../../actions/modal';

const mapStateToProps = (state) => {
  const id = state.modal.contentfulId;
  const json = find(state.campaign.pages, { id })
    || find(state.campaign.actionSteps, { id })
    || find(state.campaign.activityFeed, { id });

  const confirmationAction = get(json, 'fields.additionalContent.confirmationAction');
  const confirmationActionLink = get(json, 'fields.additionalContent.confirmationActionLink');

  return {
    content: json ? json.fields.affirmation : {},
    confirmationAction,
    confirmationActionLink,
  };
};

const actionCreators = {
  closeModal,
};

export default connect(mapStateToProps, actionCreators)(PostShareModal);
