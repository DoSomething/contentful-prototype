import { connect } from 'react-redux';
import { find } from 'lodash';
import ContentModal from '../configurations/ContentModal';
import { closeModal } from '../../../actions/modal';

const mapStateToProps = (state) => {
  const id = state.modal.contentfulId;

  const json = find(state.campaign.pages, { id })
    || find(state.campaign.actionSteps, { id })
    || find(state.campaign.activityFeed, { id });

  return { json };
};

const actionCreators = {
  closeModal,
};

export default connect(mapStateToProps, actionCreators)(ContentModal);
