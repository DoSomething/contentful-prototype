import { connect } from 'react-redux';

import { getUserId } from '../../../selectors/user';
import PhotoSubmissionAction from './PhotoSubmissionAction';
import {
  initPostSubmissionItem,
  resetPostSubmissionItem,
  storeCampaignPost,
} from '../../../actions/post';

const mapStateToProps = state => ({
  campaignId: state.campaign.campaignId,
  submissions: state.postSubmissions,
  userId: getUserId(state),
});

const actionCreators = {
  initPostSubmissionItem,
  resetPostSubmissionItem,
  storeCampaignPost,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(PhotoSubmissionAction);
