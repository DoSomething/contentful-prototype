import { connect } from 'react-redux';

import { buildAuthRedirectUrl } from '../../../helpers/auth';
import PhotoSubmissionAction from './PhotoSubmissionAction';
import {
  resetPostSubmissionItem,
  storeCampaignPost,
  storePost,
} from '../../../actions/post';

const mapStateToProps = state => ({
  authRegisterUrl: buildAuthRedirectUrl(),
  campaignId: state.campaign.campaignId,
  pageId: state.campaign.id || state.page.id,
  submissions: state.postSubmissions,
});

const actionCreators = {
  resetPostSubmissionItem,
  storeCampaignPost,
  storePost,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(PhotoSubmissionAction);
