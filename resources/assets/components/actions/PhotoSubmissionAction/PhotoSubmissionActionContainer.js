import { connect } from 'react-redux';

import PhotoSubmissionAction from './PhotoSubmissionAction';
import {
  appendPostSubmissionItem,
  clearPostSubmissionItem,
  storeCampaignPost,
} from '../../../actions/post';

const mapStateToProps = state => ({
  campaignId: state.campaign.id,
  legacyCampaignId: state.campaign.legacyCampaignId,
  legacyCampaignRunId: state.campaign.legacyCampaignRunId,
  submissions: state.postSubmissions,
});

const actionCreators = {
  appendPostSubmissionItem,
  clearPostSubmissionItem,
  storeCampaignPost,
};

export default connect(mapStateToProps, actionCreators)(PhotoSubmissionAction);
