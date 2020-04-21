import { connect } from 'react-redux';

import { getUserId } from '../../../selectors/user';
import { getDataForNorthstar } from '../../../selectors';
import { buildAuthRedirectUrl } from '../../../helpers/auth';
import PhotoSubmissionAction from './PhotoSubmissionAction';
import {
  resetPostSubmissionItem,
  storeCampaignPost,
  storePost,
} from '../../../actions/post';

const mapStateToProps = state => {
  const northstarData = getDataForNorthstar(state);

  return {
    campaignId: state.campaign.campaignId,
    pageId: state.campaign.id || state.page.id,
    submissions: state.postSubmissions,
    userId: getUserId(state),
    authRegisterUrl: buildAuthRedirectUrl(northstarData),
  };
};

const actionCreators = {
  resetPostSubmissionItem,
  storeCampaignPost,
  storePost,
};

export default connect(
  mapStateToProps,
  actionCreators,
)(PhotoSubmissionAction);
