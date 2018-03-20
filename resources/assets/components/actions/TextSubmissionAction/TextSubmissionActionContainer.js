import { connect } from 'react-redux';

import TextSubmissionAction from './TextSubmissionAction';
import { storeCampaignPost } from '../../../actions/post';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  userId: state.user.id,
  campaignId: state.campaign.id,
  legacyCampaignId: state.campaign.legacyCampaignId,
  legacyCampaignRunId: state.campaign.legacyCampaignRunId,
});

const actionCreators = {
  storeCampaignPost,
};

/**
 * Export the container component.
 */
export default connect(mapStateToProps, actionCreators)(TextSubmissionAction);
