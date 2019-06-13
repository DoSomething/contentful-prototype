import { connect } from 'react-redux';

import { getUserId } from '../../../selectors/user';
import PhotoSubmissionAction from './PhotoSubmissionAction';
import {
  resetPostSubmissionItem,
  storeCampaignPost,
} from '../../../actions/post';

const mapStateToProps = state => ({
  campaignContentfulId: state.campaign.id,
  campaignId: state.campaign.campaignId,
  submissions: state.postSubmissions,
  userId: getUserId(state),
});

const actionCreators = {
  resetPostSubmissionItem,
  storeCampaignPost,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(PhotoSubmissionAction);
