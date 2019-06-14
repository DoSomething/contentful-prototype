import { connect } from 'react-redux';

import { getUserId } from '../../../selectors/user';
import PhotoSubmissionAction from './PhotoSubmissionAction';
import {
  resetPostSubmissionItem,
  storeCampaignPost,
} from '../../../actions/post';

const mapStateToProps = state => ({
  campaignId: state.campaign.campaignId,
  pageId: state.campaign.id || state.page.id,
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
